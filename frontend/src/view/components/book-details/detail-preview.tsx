import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResData } from '../../../config/api';
import { parseDate } from '../../../utils/date';

interface Props {
  thread: ResData.Thread;
  direction: 'left' | 'right';
  //onTagClick:(channelId:number, tagId:number) => void;
}
interface State {
}

export class DetailPreview extends React.Component<Props, State>{
  public render() {    
    const { attributes, author, channel, tags } = this.props.thread;
    const levelDirection = 'level' + this.props.direction;
    return (
      <div className="level">
        <div className={levelDirection}>
          <h1 className="level-item title">{attributes.title}</h1>
          { attributes.is_bianyuan && <span className="tag" style={{color: 'rgb(156,156,160)'}}>限</span> }
        </div>
        <div className={levelDirection}>
          <Link to={`/user/${author.id}`}>{author.attributes.name}</Link>
        </div>
        <div className={levelDirection}>
        { tags && tags.map((tag, i) => {
            <Link 
              className="tag"
              key={i}
              to={`/books/?tags=[${tag.id}]`}
            >{tag.attributes.tag_name}</Link>
            {(i<tags.length-1)? '-': ''}
          }) }
        </div>
        <div className={levelDirection}>
          { attributes.created_at && attributes.edited_at &&
          <span className="date">
            {parseDate(attributes.created_at)}/{parseDate(attributes.edited_at)}
          </span>
          }
          <span><i className="fas fa-eye"></i>{attributes.view_count}</span> / 
          <span><i className="fas fa-comment-alt"></i>{attributes.reply_count}</span>
        </div>
      </div>
    )
  }
}