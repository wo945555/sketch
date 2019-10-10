import * as React from 'react';
import { MobileRouteProps } from '../router';
import { ResData, API } from '../../../config/api';
import { NavBar } from '../../components/common/navbar';
import { Page } from '../../components/common/page';


interface State {
  data:API.Get['/book/$0'];
}

export class BookDetails extends React.Component<MobileRouteProps, State> {
  public state:State = {
    data:{
      thread: ResData.allocThread(),
      chapters: [],
      volumns: [],
      most_upvoted: ResData.allocPost(),
      top_review: null,
      paginate: ResData.allocThreadPaginate(),
    }
  }
  public render() {
    return (<Page top={<NavBar goBack={this.props.core.history.goBack}>文章详情</NavBar>}>
      
    </Page>)
  }
}