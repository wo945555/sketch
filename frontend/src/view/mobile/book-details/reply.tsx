import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { Card } from '../../components/common/card';
import { ReplyHeader } from './reply-header'

interface State {
  verified: boolean;
}

export class Chapters extends React.Component<MobileRouteProps, State> {
  public state: State = {
    verified: false
  };
  public render() {
    return (
      <Page top={<ReplyHeader 
       goBack={this.props.core.history.goBack}
       verified={this.state.verified}
       post={'/*reply API*/'}/>}>
        <Card>
          <textarea className="textarea" style={{border:'0px'}}  placeholder="e.g. Hello world"></textarea>
        </Card>
      </Page>
    )
  }
}