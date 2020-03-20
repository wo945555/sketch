import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { List } from '../../components/common/list';
import { NavBar } from '../../components/common/navbar';
import ClampLines from 'react-clamp-lines';
import './style.scss';
import { ResData } from '../../../config/api';
import { DBResponse } from '../../../core/db';

interface State {
  votes:DBResponse<'getUserVotes'>;
}

const msgContent = '内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中';

// TODO: content are waiting for API fix: https://trello.com/c/bxlkk1Eb/219-api-show-user-vote%E6%B2%A1%E6%9C%89author%EF%BC%8Cattitue%E5%92%8Ccontent

export class Votes extends React.Component<MobileRouteProps, State> {
  public state:State = {
    votes: [],
  };

  public async componentDidMount() {
    const { user, db } = this.props.core;
    const userId = user.id;
    const votes = await db.getUserVotes(userId);
    this.setState({votes});
    console.log(votes);
  }

  private renderVote(vote:ResData.Vote) {
    const author = vote.author.attributes.name;
    return (
      <List.Item key={vote.id}>
        <div className="item-container">
          <div className="item-first-line">
            <span>{author}赞了你</span>
            <span className="right">{vote.attributes.created_at}</span>
          </div>
          <div className="item-brief">
            <ClampLines
              text={msgContent}
              id={'text' + vote.id}
              lines={2}
              ellipsis="..."
              buttons={false}
              innerElement="p"/>
          </div>
        </div>
      </List.Item>
    );
  }

  public render () {
    const { votes } = this.state;
    return (<Page
        top={<NavBar goBack={this.props.core.route.back}>
          点赞提醒
        </NavBar>}>

        { votes.length > 0 && (
          <List className="message-list">
            { votes.map((n, i) => this.renderVote(n))}
          </List>
        )}
      </Page>);
  }
}