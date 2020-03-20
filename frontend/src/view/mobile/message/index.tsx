import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { List } from '../../components/common/list';
import { NavBar } from '../../components/common/navbar';
import { MessageMenu } from './message-menu';
import './style.scss';
import { MarkAllAsRead } from './mark-all-as-read';
import { Menu, MenuItem } from '../../components/common/menu';
import { RoutePath } from '../../../config/route-path';
import { ResData } from '../../../config/api';
import { ActivityItem } from './activity-item';
import { DBResponse } from '../../../core/db';

interface State {
  activities:DBResponse<'getActivities'>;
}

export class Message extends React.Component<MobileRouteProps, State> {
  public state:State = {
    activities:{
      activities: [],
      paginate: ResData.allocThreadPaginate(),
    },
  };

  public async componentDidMount() {
    const { getActivities } = this.props.core.db;
    const activities = await getActivities();
    this.setState({activities});
    console.log(activities);
  }
  public render () {
    const history = this.props.core.history;
    return (<Page
        top={<NavBar goBack={this.props.core.route.back}
        menu={NavBar.MenuIcon({
          onClick: () => console.log('open setting'),
        })}>
          <MessageMenu/>
        </NavBar>}>

        <MarkAllAsRead />

        <Menu>
          <MenuItem icon="far fa-thumbs-up icon" title="点赞提醒"
            onClick={() => history.push(RoutePath.votes)}
            badgeNum={1000}/>
          <MenuItem icon="fas fa-gift icon" title="打赏提醒" badgeNum={1}/>
        </Menu>

        <List className="message-list">
          {this.state.activities.activities.map((n, i) =>
            <ActivityItem read={true} activity={n} key={i}/>)}
        </List>
      </Page>);
  }
}