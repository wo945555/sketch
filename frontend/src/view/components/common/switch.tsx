import * as React from 'react';
import './switch.scss';
import { classnames } from '../../../utils/classname';

export class Switch extends React.Component <{
  // props
  onChange?: () => void;
  className?: string;
  value?: boolean | string | number;
  disabled?: boolean;
  size?:'normal'|'medium'|'large';
  rounded?:boolean;
  activeColor?: string; //打开时背景色
  inactiveColor?: string; //关闭
}, {
  // state
}> {
public render() {
  return (
    <div className={classnames('switch', this.props.className)}>
      <input
        type="checkbox"
        className="switch-input"
        onChange={this.props.onChange}
      ></input>
    </div>
  )
}
}