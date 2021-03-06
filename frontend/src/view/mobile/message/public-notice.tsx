import * as React from 'react';
import { ResData } from '../../../config/api';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { NavBar } from '../../components/common/navbar';
import { ExpandableMessage } from '../../components/message/expandable-message';
import { DBResponse } from '../../../core/db';

interface State {
  publicNoticeData:DBResponse<'getPublicNotice'>;
}

// TODO: unread
// TODO: common component to display article: will display newline, blank new, tab correctly

// public notice data can be passed via props (it's optional)
export class PublicNotice extends React.Component<MobileRouteProps, State> {
  public state:State = {
    publicNoticeData:{
      public_notices: [],
    },
  };

  public async componentDidMount() {
    let publicNoticeData;
    if (this.props.location.state && this.props.location.state.publicNoticeData) {
      publicNoticeData = this.props.location.state.publicNoticeData;
    } else {
      publicNoticeData = await this.props.core.db.getPublicNotice()
                                .catch((e) => {
                                  console.log(e);
                                  return this.state.publicNoticeData;
                                });
    }
    console.log(publicNoticeData);
    this.setState({publicNoticeData});
  }

  private isNoticeUnread (notice:ResData.PublicNotice) : boolean {
    // TODO
    if (notice.id > 2) { return true; }
    return false;
  }

  private renderNotice (notice:ResData.PublicNotice) {
    const title = notice.attributes.title ? notice.attributes.title : '通知';
    const authorName = notice.author ? notice.author.attributes.name : '管理员';
    const time = notice.attributes.created_at;
    const id = notice.id;
    const content = notice.attributes.body;
    const footer = `${authorName} ${time}`;
    const unread = this.isNoticeUnread(notice);

    return (
      <ExpandableMessage
        key={'pn' + id}
        title={title}
        uid={'pn' + id}
        content={content}
        footer={footer}
        boldTitle={unread}/>);
  }

  public render () {
    return (<Page className="msg-page"
        top={<NavBar goBack={this.props.core.route.back}
        menu={NavBar.MenuIcon({
          onClick: () => console.log('open setting'),
        })}
        >
          公共通知
        </NavBar>}>
        {this.state.publicNoticeData.public_notices.map((n) => this.renderNotice(n))}
      </Page>);
  }
}
