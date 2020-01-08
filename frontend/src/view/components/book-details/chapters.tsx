import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResData } from '../../../config/api';
import { classnames } from '../../../utils/classname';
import './chapters.scss';
interface Props {
  bookId:number;
  chapters: ResData.Post[];
}
interface State {
  isReverse: boolean;
}

export class Chapters extends React.Component<Props, State> {
  public state:State = {
    isReverse: false,
  }

  public render () {
    let sortChapters = this.state.isReverse ? this.props.chapters.reverse() : this.props.chapters;
    return (
      <div className="chapters">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <h2 className="title" style={{
                borderBottom: '2px solid rgb(200,86,93)',
                boxSizing: 'border-box'}}>章节目录</h2>
            </div>
          </div>
          <div className="level-right">
            <div className="chapters-control level-item">
              <a className={classnames(
                'chapters-control-txt',
                (this.state.isReverse ? '' : 'black')
              )}
               onClick={() => this.setState({isReverse: false})}>最早</a>
              &nbsp; | &nbsp;
              <a className={classnames(
                'chapters-control-txt',
                (this.state.isReverse ? 'black' : '')
              )}
              onClick={() => this.setState({isReverse: true})}>最新</a>
            </div>
          </div>
        </div>
        <div>
          { sortChapters.length > 0 &&  sortChapters.map((chapter, i) => {
             <Link to={`/book/${this.props.bookId}/chapter/${chapter.id}`} key={i}>
                <span className="chapters-title-head">{/*章节前缀(第几章|番外几..)*/}</span>
                {chapter.attributes.title}
             </Link>
          }) } 
        </div>
      </div>
    )
  }
}
