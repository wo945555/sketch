import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { List } from '../../components/common/list';
import { NavBar } from '../../components/common/navbar';
import ClampLines from 'react-clamp-lines';
import './style.scss';
import { API } from '../../../config/api';

interface State {
  votes:API.Get['/user/$0/vote_received'];
}

const msgContent = '内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中';

// TODO: author, content, attitude are waiting for API fix: https://trello.com/c/bxlkk1Eb/13-api-show-user-vote%E6%98%BE%E7%A4%BAauthor%E4%B8%BA%E7%A9%BA

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

  public render () {
    const { votes } = this.state;
    /* TODO: navbar setting, waiting for UI mockup */
    return (<Page
        top={<NavBar goBack={this.props.core.route.back} onMenuClick={() => console.log('open setting')}>
          点赞提醒
        </NavBar>}>

        { votes.length > 0 && (
          <List className="message-list">
            { votes.map((n, i) =>
              <List.Item key={i}>
                <div className="item-container">
                  <div className="item-first-line">
                    <span>有人赞了你</span>
                    <span className="right">{n.attributes.created_at}</span>
                  </div>
                  <div className="item-brief">
                    <ClampLines
                      text={msgContent}
                      id={'text' + i}
                      lines={2}
                      ellipsis="..."
                      buttons={false}
                      innerElement="p"/>
                  </div>
                </div>
              </List.Item>)}
          </List>
        )}
      </Page>);
  }
}