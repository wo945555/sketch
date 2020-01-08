import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { Card } from '../../components/common/card';
import { Switch } from '../../components/common/switch';
import { ReplyHeader } from './reply-header'
import { API, ReqData } from '../../../config/api';
import './reply.scss';

interface State {
  verified: boolean;
  body: string;
  is_anonymous: boolean;
}

export class Reply extends React.Component<MobileRouteProps, State> {
  public state: State = {
    verified: false,
    body: '',
    is_anonymous: true,
  };
  
  public onTextChange = e => {
    let body = e.target.value,
        length = (body as string).length,
        verified = length>0;
    this.setState((state) => ({body,verified}));
  }
  public handleSubmit = e => {
    e.preventDefault();
    const { verified, body, is_anonymous } = this.state;
    if(!verified) return
    const attributes = {
      body,
      is_anonymous,
      created_at: new Date().toString()
    }
    const author = { 
      attributes: {
        name: '',
      },
    }
    const data = { attributes, author }; //暂时不知道ReqData.quote的结构
    this.postQuote(data);
  }
  public postQuote = data => {
    //fetch.post(api, data).then(()=>{/*回到上一页并刷新文章详情页数据*/})
  }
  //切换匿名
  public onSwitchChange = actived => {
    this.setState({ is_anonymous: actived })
  }
  public render() {
    const { verified, is_anonymous } = this.state;
    const placeholder = '评论十个字起哦~请勿发布类似“如何升级”的无意义水贴。站内严禁污言秽语、人身攻击。社区气氛依赖于每一条咸鱼的爱惜~';
    return (
      <div id="reply">
        <Page top={<ReplyHeader 
          goBack={this.props.core.history.goBack}
          verified={verified}
          onSubmit={this.handleSubmit} />}>
          <Card className="reply-content" style={{padding: '0px'}}>
            <textarea className="textarea"
             placeholder={placeholder}
             onChange={this.onTextChange}
             ></textarea>
          </Card>
          <Card className="clearfix reply-footer">
            <div className="level is-mobile right">
              <span className="level-item">匿名提交</span>
              <Switch className="level-item"
               actived={is_anonymous}
               onChange={this.onSwitchChange}
              ></Switch>
            </div>
          </Card>
        </Page>
      </div>     
    )
  }
}