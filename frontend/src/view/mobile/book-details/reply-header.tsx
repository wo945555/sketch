import * as React from 'react';
import { Card } from '../../components/common/card';
import { Anchor } from '../../components/common/pagination';

interface Props {
  goBack:() => void;
  verified: boolean;
  post: string;
}
interface State {
}

export class ReplyHeader extends React.Component<Props, State> {
  public render() {
    return (
      <Card>       
        <header className="level is-mobile">
          <div className="level-left">     
            <span className="level-item">
              <a onClick={this.props.goBack}>取消</a>
            </span>
          </div>
          <span className="level-item" style={{fontSize: '200%'}}>回复</span>
          <div className="level-right">
            <span className="level-item">
              <Anchor isDisabled={!this.props.verified} to={this.props.post}>提交</Anchor>
            </span>
          </div>
        </header>
      </Card>
    )
  }
}