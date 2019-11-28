import * as React from 'react';
import './switch.scss';
import { classnames } from '../../../utils/classname';

type Color = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger';

export class Switch extends React.Component <{
  // props
  onChange?: () => void;
  className?: string;
  value?: boolean | string | number;
  disabled?: boolean;
  rounded?:boolean;
  activeColor?: Color; //打开时背景色
  inactiveColor?: Color; //关闭时背景色
}, {
  // state
  actived: boolean;
}> {
  public state = {
    actived: true
  };

  public render() {
    const activeColor = this.props.activeColor ? 'is-' + this.props.activeColor : 'is-danger';
    const inactiveColor = this.props.inactiveColor ? 'is-' + this.props.inactiveColor : 'is-light';
    return (
      <div className={classnames('switch', 
        {'is-actived': this.state.actived},
        this.props.className
      )}>
        <input
          id="switch-input"
          type="checkbox"
          onChange={this.props.onChange}
        ></input>
        <label htmlFor="switch-input" className={classnames('switch-label',
            {[activeColor]: !this.props.disabled && this.state.actived},
            {[inactiveColor]: !this.props.disabled && !this.state.actived}
          )}>
        </label>
      </div>
    )
  }
}