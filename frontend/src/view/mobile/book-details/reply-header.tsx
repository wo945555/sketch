import * as React from 'react';
import { Card } from '../../components/common/card';
import { classnames } from '../../../utils/classname';
interface Props {
  goBack:() => void;
  onSubmit:(e?: any) => void;
  verified: boolean;
}
interface State {
}
export class ReplyHeader extends React.PureComponent<Props, State> {
  private submitRef: React.RefObject<HTMLAnchorElement>;
  constructor(props:Props) {
    super(props);
    this.submitRef = React.createRef();
  }
  public componentDidUpdate() {
    const { current } = this.submitRef;
    if(this.props.verified){
      current && current.setAttribute('disabled', '')
    }else {
      current && current.setAttribute('disabled', 'disabled')
    }
  }
  public render() {
    const { goBack, onSubmit, verified } = this.props;
    return (
      <Card className="reply-header" style={{marginTop: '0px'}}>       
        <header className="level is-mobile">
          <div className="level-left">     
            <span className="level-item">
              <a onClick={goBack}>取消</a>
            </span>
          </div>
          <span className="level-item reply-title">回复</span>
          <div className="level-right">
            <span className="level-item">
              <a className={classnames({'has-text-grey-light': !verified})}
              onClick={onSubmit} 
              ref={this.submitRef}>提交</a>
            </span>
          </div>
        </header>
      </Card>
    )
  }
}