import * as React from 'react';
import { ResData } from '../../../config/api';
import './chapter-list.scss';
import { Card } from '../common/card';
import { List } from '../common/list';

type ChapterOrder = 'created'|'latest';

interface Props {
  chapters:ResData.Post[];
  showFull?:boolean;
  goChapter:(chapterId:number) => void;
}
interface State {
  order:ChapterOrder;
}

export class ChapterList extends React.Component<Props, State> {
  public state:State = {
    order: 'created',
  };

  public render () {
    return <Card className="comps-thread-chapter-list">
      <div className="title-container">
        <div className="title">章节目录</div>
        <div className="order">
          <span className={this.state.order === 'created' ? 'bold' : ''} onClick={() => this.changeOrder('created')}>最早</span>
          <span className="divider">|</span>
          <span className={this.state.order === 'latest' ? 'bold' : ''} onClick={() => this.changeOrder('latest')}>最新</span>
        </div>
      </div>

      <List>
        {this.props.chapters.map((chapter, i) => <List.Item
            key={chapter.id}
            onClick={() => this.props.goChapter(chapter.id)}
          >
            <span className="index">{i}</span>
            <span className="chapter-title">
              {chapter.attributes.title}
            </span>
          </List.Item>)
        }
        {!this.props.chapters.length && <List.Item>无章节</List.Item>}
      </List>
    </Card>;
  }

  public changeOrder = (order:ChapterOrder) => {
    this.setState({order});
  }
}