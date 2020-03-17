import * as React from 'react';
import { ResData, ReqData } from '../../../config/api';
import { Card } from '../common/card';

interface Props {
  data:ResData.Post;
  isAuthor:boolean;
  onVote:(attitude:ReqData.Vote.attitude) => void; //vote: true=点赞, false=移除点赞
  onReply:() => void;
}

interface State {
}

export class Post extends React.Component<Props, State> {
  public render () {
    return <Card>

      {/* remove follow lines */}
      <button onClick={() => this.props.onVote(ReqData.Vote.attitude.upvote)}>vote</button>
      <button onClick={() => this.props.onVote(ReqData.Vote.attitude.upvote)}>unVote</button>
      <button onClick={() => this.props.onReply()}>reply</button>

    </Card>;
  }
}