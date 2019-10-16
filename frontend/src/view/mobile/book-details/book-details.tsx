import * as React from 'react';
import { MobileRouteProps } from '../router';
import { ResData, API } from '../../../config/api';
import { NavBar } from '../../components/common/navbar';
import { Page } from '../../components/common/page';
import { DetailPreview } from '../../components/book-details/detail-preview'

type Direction = 'left' | 'right';
interface State {
  data:API.Get['/book/$0'];
}
interface Thread extends ResData.Thread {}

export class BookDetails extends React.Component<MobileRouteProps, State> {
  public state:State = {
    data:{
      thread: {
        type: 'thread',
        id: 0,
        author: ResData.allocUser(),
        attributes:{id:1,
          user_id:1,
          channel_id:1,
          title:'文字',
          brief:'文字',
          body:'文字',
          is_anonymous:true,
          majia:null,
          creation_ip:'0,0,0,0',
          created_at:new Date().toString(),
          edited_at:new Date().toString(),
          is_locked:true,
          is_public:true,
          is_bianyuan:true,
          no_reply:true,
          use_markdown:true,
          use_indentation:true,
          view_count:99,
          reply_count:99,
          collection_count:99,
          download_count:99,
          jifen:99,
          weighted_jifen:99,
          total_char:1,
          responded_at:new Date().toString(),
          last_post_id:1,
          added_component_at:new Date().toString(),
          last_component_id:1,
          deleted_at:new Date().toString()
        },
      },
      chapters: [],
      volumns: [],
      paginate: ResData.allocThreadPaginate(),
      most_upvoted: ResData.allocPost(),
      top_review: null,
    }
  }
  public render() {
    const { thread, chapters } = this.state.data;
    let direction: Direction = /* this.state.data.thread.attributes.picture? 'left': 'right' */'left';
    return (<Page top={<NavBar goBack={this.props.core.history.goBack}>文章详情</NavBar>}>
      <header className="columns">
        {/* { thread.attributes.picture && (<div className="columns">
          <img className="image" src={thread.attributes.picture} alt="cover"></img>
        </div>) } */}
        <div className="columns">
          <DetailPreview thread={thread} direction={direction}></DetailPreview>
        </div>)           
      </header>
      <section>
        <article>
          <h2 className="title" style={{
            borderBottom: '2px solid rgb(200,86,93)',
            boxSizing: 'border-box'}}>文案</h2>
            <p>{thread.attributes.brief}</p>
        </article>
        <div>
        <h2 className="title" style={{
            borderBottom: '2px solid rgb(200,86,93)',
            boxSizing: 'border-box'}}>最新章节</h2>
            {  chapters.length>0 && <p>{chapters[0].attributes.title}</p> }
        </div>
      </section>
    </Page>)
  }
}