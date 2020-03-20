import * as React from 'react';
import { Popup } from '../common/popup';

interface Props {
    onClose:() => void;
    salt:number;
    fish:number;
    ham:number;
    onReward:(type:'salt'|'fish'|'ham', value:number) => void;
}

interface State {

}

export class Reward extends React.Component<Props, State> {
    public state:State = {

    };

    public render () {
        return <Popup onClose={this.props.onClose}>

        </Popup>;
    }
}