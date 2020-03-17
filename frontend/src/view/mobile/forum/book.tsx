import * as React from 'react';
import { ThreadProfile, ThreadMode } from '../../components/thread/thread-profile';
import { ChapterList } from '../../components/thread/chapter-list';
import { ResData, API, ReqData } from '../../../config/api';
import { NavBar } from '../../components/common/navbar';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { Post } from '../../components/thread/post';
import { notice } from '../../components/common/notice';
import { Review } from '../../components/thread/review';
import { Reply } from '../../components/thread/reply';
import { Reward } from '../../components/thread/reward';

interface State {
  data:API.Get['/thread/$0'];
  mode:ThreadMode;
  showReward:boolean;
  page:'review'|'default'|'reply';
}

export class Book extends React.Component<MobileRouteProps, State> {
  public state:State = {
    data: {
      thread: ResData.allocThread(),
      posts: [],
      paginate: ResData.allocThreadPaginate(),
    },
    mode: 'reading',
    showReward: false,
    page: 'default',
  };

  public async componentDidMount () {
    const data = await this.props.core.db.getThread(+this.props.match.params.id);
    if (data) {
      this.setState({data});
    }
  }

  public render () {
    switch (this.state.page) {
      case 'review':
        return this.renderReview();
      case 'reply':
        return this.renderReply();
      case 'default':
      default:
        return this.renderBook();
    }
  }

  public renderBook () {
    const { data } = this.state;
    return (
      <Page noTopBorder
        top={
          <NavBar goBack={this.props.core.route.back}>
            文章详情
          </NavBar>}
        >
        <ThreadProfile
          thread={data.thread}
          changeMode={(mode) => this.setState({mode})}
          onCollect={() => {
            this.props.core.db.collectThread(data.thread.id)
              .catch(notice.requestError);
          }}
          onReward={() => this.setState({showReward: true})}
          onReview={() => this.setState({page: 'review'})}
          onReply={() => this.setState({page: 'reply'})}
        />

        <ChapterList
          chapters={data.thread.component_index_brief}
          goChapter={(id) => this.props.core.route.chapter(data.thread.id, id)}
        />

        {this.state.data.posts.map((post, i) => <Post
          key={post.id}
          data={post}
          onVote={(vote) => {}}
          onReward={(reward) => {}}
          onReply={() => this.setState({
            page: 'reply',
          })}
        />)}

        {this.state.showReward && <Reward
          onClose={() => this.setState({showReward: false})}
          salt={99 /* todo: */}
          fish={99}
          ham={99}
          onReward={(type, value) => {}}
        />}

      </Page>
    );
  }

  public renderReview () {
    return <Review
      goBack={() => this.setState({page: 'default'})}
      title={this.state.data.thread.attributes.title}
      publish={(data) => {
        //todo:
      }}
    />;
  }

  public renderReply () {
    return <Reply
      goBack={() => this.setState({page: 'default'})}
      submit={(body, anonymous) => {
        this.props.core.db.addPostToThread(this.state.data.thread.id, {
          body,
          type: ReqData.Post.withType.post,
          is_anonymous: anonymous || false,
        })
          .then(() => this.setState({page: 'default'}))
          .catch(notice.requestError);
      }}
    />;
  }
}