import * as React from 'react';
import { Core } from '../../../core';
import { Page, TabCard } from '../../components/common';
import { APIGet, ResData } from '../../../config/api';
import { URLParser } from '../../../utils/url';
import { Tags } from '../../components/book/tags';
import { RouteComponentProps } from 'react-router';
import { UnregisterCallback } from 'history';
import { parseDate } from '../../../utils/date';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps {
    core:Core;
}

interface State {
    data:APIGet['/homebook']['res']['data'];
    tags:APIGet['/config/noTongrenTags']['res']['data']['tags'];
}

export class Books extends React.Component<Props, State> {
    public unListen:UnregisterCallback|null = null;
    public state:State = {
        data: {
            recent_long_recommendations: [],
            recent_short_recommendations: [],
            random_short_recommendations: [],
            recent_custom_short_recommendations: [],
            recent_custom_long_recommendations: [],
            recent_added_chapter_books: [],
            recent_responded_books: [],
            highest_jifen_books: [],
            most_collected_books: [],
        },
        tags: [],
    };

    public componentDidMount () {
        this.loadData();
        this.unListen = this.props.core.history.listen(() => this.loadData());
    }

    public componentWillUnmount () {
        if (this.unListen) {
            this.unListen();
        }
    }

    public render () {
        return (<Page className="books">
            <Tags
                tags={this.state.tags}
                searchTags={(tags) => {
                    const url = new URLParser();
                    if (tags.length === 0) {
                        this.props.core.history.push(
                            url.removeQuery('tags').getPathname(),
                            {tags});
                    } else {
                        this.props.core.history.push(
                            url.setQuery('tags', tags).getPathname(),
                            {tags});
                    }
                }}
                getFullList={() => {
                    this.loadNoTongrenTags();
                }} />
            {this.renderRecoms()}
            {this.renderCustomRecoms()}
            {this.renderBookList()}
        </Page>);
    }

    public renderRecoms () {
        return <TabCard className="recommendations"
            tabs={[
                {
                    name: '长推',
                    children: <>{this.state.data.recent_long_recommendations.map(this.renderRecomBlock)}</>,
                },
                {
                    name: '最新',
                    children: <>{this.state.data.recent_short_recommendations.map(this.renderRecomBlock)}</>,
                },
                {
                    name: '往期',
                    children: <>{this.state.data.random_short_recommendations.map(this.renderRecomBlock)}</>,
                },
            ]} 
            more={'/homebook' /** fixme: */}
        />;
    }

    public renderRecomBlock = (recommendation:ResData.Post, key:number) => {
        return <div className="recommendation" key={key}>
            {key > 0 && <hr />}
            <div className="title">{recommendation.attributes.title}</div>
            <div className="brief">{recommendation.attributes.brief}</div>
            <div className="info">
                {recommendation.author &&
                    <span className="author">{recommendation.author.attributes.name}</span>
                }
                <span className="date">{parseDate(recommendation.attributes.created_at)}</span>
            </div>
        </div>;
    }

    public renderCustomRecoms () {
        return <TabCard
            className="random-recoms"
            tabs={[
                {
                    name: '用户短推',
                    children: <>{this.state.data.recent_custom_short_recommendations.map(this.renderRecomBlock)}</>,
                },
                {
                    name: '用户长推',
                    children: <>{this.state.data.recent_custom_long_recommendations.map(this.renderRecomBlock)}</>,
                }
            ]}
            more={'/homebook' /* fixme: */}
        />;
    }

    public renderBookList () {
        return <TabCard
            className="books"
            tabs={[
                {
                    name: '最新更新',
                    children: <>{this.state.data.recent_added_chapter_books.map(this.renderBookBlock)}</>,
                },
                {
                    name: '最高积分',
                    children: <>{this.state.data.highest_jifen_books.map(this.renderBookBlock)}</>,
                },
                {
                    name: '最多收藏',
                    children: <>{this.state.data.most_collected_books.map(this.renderBookBlock)}</>,
                },
                {
                    name: '最新回复',
                    children: <>{this.state.data.recent_responded_books.map(this.renderBookBlock)}</>,
                }
            ]}
            more={'/books'}
        />;
    }
    public renderBookBlock = (book:ResData.Thread, key:number) => {
        return <Link className="book" key={key} to={`/book/${book.id}`}>
            {key !== 0 && <hr />}
            <div className="title">{book.attributes.title}</div>
            <div className="brief">{book.attributes.brief}</div>
            <div className="info">
                <span className="author">{book.author.attributes.name}</span>
                <span className="date">{parseDate(book.author.attributes.created_at)}</span>
            </div>
        </Link>;
    }

    public loadData (tags?:number[]) {
        (async () => {
            const url = new URLParser();
            if (url.getAllPath()[0] !== 'homebook') { return; }

            const res = await this.props.core.db.get('/homebook', undefined);
            if (!res || !res.data) { return; }
            console.log(res.data);
            this.setState({data: res.data});
        })();
    }

    public loadNoTongrenTags () {
        (async () => {
            const res = await this.props.core.db.get('/config/noTongrenTags', undefined);
            if (!res || !res.data) { return; }
            this.setState({tags: res.data.tags});
        })();
    }
}