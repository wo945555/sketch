import * as React from 'react';
import { Page } from '../common/page';
import { NavBar } from '../common/navbar';

export type RewardData = {
    title:string;
    brief:string;
    rate:number; // 评分, 1-10
    suggest:boolean; //向他人推荐
    body:string;
    useMarkdown:boolean;
    indent:boolean; //首段缩进
};

interface Props {
    goBack:() => void;
    publish:(data:RewardData) => void;
    title:string;
}

interface State extends RewardData {
    publishDisabled:boolean;
}

export class Review extends React.Component<Props, State> {
    public state:State = {
        title: '',
        brief: '',
        rate: 0,
        suggest: false,
        body: '',
        useMarkdown: false,
        indent: false,
        publishDisabled: false,
    };

    public render () {
        return <Page top={
            <NavBar goBack={this.props.goBack}
                menu={NavBar.MenuText({
                    onClick: () => this.props.publish(this.state),
                    value: '发布',
                    disabled: this.state.publishDisabled,
                })}
            >
                评《{this.props.title}》
            </NavBar>
        }>

        </Page>;
    }
}