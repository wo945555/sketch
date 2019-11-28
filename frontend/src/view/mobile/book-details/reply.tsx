import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { Card } from '../../components/common/card';
import { ReplyHeader } from './reply-header'

interface State {
  verified: boolean;
}

export class Reply extends React.Component<MobileRouteProps, State> {
  public state: State = {
    verified: false
  };
  public render() {
    const placeholder = '评论十个字起哦~请勿发布类似“如何升级”的无意义水贴。站内严禁污言秽语、人身攻击。社区气氛依赖于每一条咸鱼的爱惜~';
    return (
      <Page top={<ReplyHeader 
       goBack={this.props.core.history.goBack}
       verified={this.state.verified}
       post={'/*reply API*/'}/>}>
        <Card>
          <textarea className="textarea" style={{border:'0px'}} placeholder={placeholder}></textarea>
        </Card>
        <Card>
          <div>
            <span>匿名提交</span>
            
          </div>
        </Card>
      </Page>
    )
  }
}