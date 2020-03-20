import * as React from 'react';
import { MobileRouteProps } from '../router';
import { NavBar } from '../../components/common/navbar';
import { Page } from '../../components/common/page';

interface State {

}

export class Chapter extends React.Component<MobileRouteProps, State> {
  public render () {
    return <Page
      top={<NavBar goBack={this.props.core.route.back} menu={<NavBar.MenuText value="个性化" onClick={() => {/** todo: */}} />}>
      </NavBar>}>
      bookId: {this.props.match.params.bid}, chapterId: {this.props.match.params.cid}
    </Page>;
  }
}