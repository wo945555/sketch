import * as React from 'react';
import { classnames } from '../../../utils/classname';
import './collapse.scss';

interface Props {
  children:React.ReactNode;
  className?:string;
}
interface State {
  expanded:boolean;
}

export class Collapse extends React.Component<Props, State>{
  public state:State = {
    expanded: false,
  };
  public toggle = () => {
    this.setState((prevState) => {
      const expanded = !prevState.expanded;
    });
  }
  public render() {
    let contentCln = classnames('collapse-content','is-small', `content-${this.state.expanded ? 'fold' : ''}`);
    let iconCln = this.state.expanded? 'fa-caret-down': 'fa-caret-up';
    return (
      <div className={classnames('level', 'collapse', this.props.className)}>
        <p className={classnames('level-item', contentCln )}>{this.props.children}</p>
        <div className="level-right">
          <span className="level-item" style={{fontWeight: 'bold'}}>
            展开
            <i className={classnames('icon', 'fa', iconCln, 'fa-lg')}></i>
          </span>
        </div>
      </div>
    )
  }
}