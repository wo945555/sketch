import * as React from 'react';
import { ResData } from '../../../config/api';
import { Card } from '../common/card';

interface Props {
  data:ResData.Post;
  onVote:(vote:boolean) => void; //vote: true=点赞, false=移除点赞
  onReward:(reward:boolean) => void; // reward: true=打赏, false=移除打赏
  onReply:() => void;
}

interface State {
}

export class Post extends React.Component<Props, State> {
  public render () {
    return <Card>

      {/* remove follow lines */}
      <button onClick={() => this.props.onVote(true)}>vote</button>
      <button onClick={() => this.props.onVote(false)}>unVote</button>
      <button onClick={() => this.props.onReward(true)}>reward</button>
      <button onClick={() => this.props.onReward(false)}>unReward</button>
      <button onClick={() => this.props.onReply()}>reply</button>

    </Card>;
  }
}