import * as React from 'react';
import './switch.scss';
import { classnames } from '../../../utils/classname';

export type Color = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger'
|'grey-light'|'grey-lighter';

export class Switch extends React.Component <{
  // props
  onChange?: (actived: boolean) => void;
  className?: string;
  actived?: boolean;
  disabled?: boolean;
  activeColor?: Color; //打开时背景色
  inactiveColor?: Color; //关闭时背景色
}, {
  // state
  actived: boolean;
}> {
  public state = {
    actived: this.props.actived || false
  };

  public handleChange = (e) => {
    this.setState((prevState)=> ({
      actived: !prevState.actived
    }), () => {
      if(this.props.onChange) {
        this.props.onChange(this.state.actived)
      }
    }
    );
  }
  public render() {
    const { className, disabled, activeColor, inactiveColor } = this.props;
    const activeC = activeColor ? 'has-background-' + activeColor : 'has-background-danger';
    const inactiveC = inactiveColor ? 'has-background-' + inactiveColor : 'has-background-grey-lighter';
    const disableC = 'has-background-grey-light'
    return (
      <div className={classnames('switch', 
        {'is-actived': this.state.actived},
        className
        )}
      >
        <input
          id="switch-input"
          type="checkbox"
          disabled={disabled}
          onChange={this.handleChange.bind(this)}
        ></input>
        <label htmlFor="switch-input" className={classnames('switch-label',
          {[disableC]: disabled},
          {[activeC]: !disabled && this.state.actived},
          {[inactiveC]: !disabled && !this.state.actived}
        )}>
        </label>
      </div>
    )
  }
}