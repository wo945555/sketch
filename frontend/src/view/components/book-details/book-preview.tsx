import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResData, API } from '../../../config/api';
import { parseDate } from '../../../utils/date';

interface Props {
  thread: ResData.Thread,
  direction: 'left' | 'right'
}
interface State {
}

export class BookIfo extends React.Component<Props, State>{
  public render() {    
    const { attributes, author, channel, tags } = this.props.thread;
    const levelDirection = 'level' + this.props.direction;
    return (
      <div className="level">
        <div className={levelDirection}>
          <h1 className="level-item title">{attributes.title}</h1>
          {tags && tags.map((tag, i) => {
            <span 
              className="tag"
              key={i}
            >{tag.attributes.tag_name}</span>
          })}
        </div>
        <div className={levelDirection}>
          <Link to={`/user/${author.id}`}>{author.attributes.name}</Link>
        </div>
        <div className={levelDirection}>
          
        </div>
        <div className={levelDirection}>
          <span><i className="fas fa-eye"></i>{attributes.view_count}</span> / 
          <span><i className="fas fa-comment-alt"></i>{attributes.reply_count}</span>
        </div>
      </div>
    )
  }
}