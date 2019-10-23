import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResData } from '../../../config/api';

interface Props {
  bookId:number;
  chapters: ResData.Post[];
}
interface State {

}

export class Chapter extends React.Component<Props, State> {
  public render () {
    return (
      <div className="chapters">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h2 className="title" style={{
                borderBottom: '2px solid rgb(200,86,93)',
                boxSizing: 'border-box'}}>章节目录</h2>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a>最早</a>
              &nbsp; | &nbsp;
              <a>最新</a>
            </div>
          </div>
        </div>
        <div>
          { this.props.chapters.length > 0 &&  this.props.chapters.map((chapter, i) => {
             <Link to={`/book/${this.props.bookId}/chapter/${chapter.id}`} key={i}>
                <span className="chapters-title-head"></span>{chapter.attributes.title}
             </Link>
          }) } 
        </div>
      </div>
    )
  }
}
