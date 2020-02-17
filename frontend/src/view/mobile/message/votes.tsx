import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { List } from '../../components/common/list';
import { NavBar } from '../../components/common/navbar';
import ClampLines from 'react-clamp-lines';
import './style.scss';

interface State {

}

const mockVotes = {
  'code': 200,
  'data': [
      {
          'type': 'vote',
          'id': 3,
          'attributes': {
              'votable_type': 'quote',
              'votable_id': 17,
              'attitude': '',
              'created_at': '2020-02-18 04:43:13',
          },
          'author': [],
          'receiver': [],
      },
      {
          'type': 'vote',
          'id': 2,
          'attributes': {
              'votable_type': 'quote',
              'votable_id': 17,
              'attitude': '',
              'created_at': '2020-02-18 04:42:48',
          },
          'author': [],
          'receiver': [],
      },
      {
          'type': 'vote',
          'id': 1,
          'attributes': {
              'votable_type': 'quote',
              'votable_id': 17,
              'attitude': '',
              'created_at': '2020-02-18 04:41:38',
          },
          'author': [],
          'receiver': [],
      },
      {
        'type': 'vote',
        'id': 2,
        'attributes': {
            'votable_type': 'quote',
            'votable_id': 17,
            'attitude': '',
            'created_at': '2020-02-18 04:42:48',
        },
        'author': [],
        'receiver': [],
    },
    {
        'type': 'vote',
        'id': 1,
        'attributes': {
            'votable_type': 'quote',
            'votable_id': 17,
            'attitude': '',
            'created_at': '2020-02-18 04:41:38',
        },
        'author': [],
        'receiver': [],
    },
  ],
};
const msgContent = '内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中内容等待API中';

// TODO: vote.author and vote.content are waiting for API fix: https://trello.com/c/bxlkk1Eb/13-api-show-user-vote%E6%98%BE%E7%A4%BAauthor%E4%B8%BA%E7%A9%BA

export class Votes extends React.Component<MobileRouteProps, State> {
  public render () {
    return (<Page
        top={<NavBar goBack={this.props.core.route.back} onMenuClick={() => console.log('open setting')}>
          点赞提醒
        </NavBar>}>

        <List className="message-list">
          { mockVotes.data.map((n, i) =>
          <List.Item key={i}>
            <div className="item-container">
              <div className="item-first-line">
                <span>有人赞了你</span>
                <span className="right">3分钟前</span>
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
      </Page>);
  }
}