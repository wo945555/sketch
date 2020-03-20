import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { MainMenu } from '../main-menu';
import { SearchBar } from '../search/search-bar';
import { DBResponse } from '../../../core/db';

interface State {
  data:DBResponse<'getThreadList'>;
}

export class Forum extends React.Component<MobileRouteProps, State> {
  public render () {
    return <Page bottom={<MainMenu />}>
      <SearchBar core={this.props.core} />
    </Page>;
  }
}