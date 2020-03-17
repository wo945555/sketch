import React from 'react';
import ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { classnames } from '../../../utils/classname';
import { setIdleTimeout } from '../../../utils/timer';
import './notice.scss';

type NoticeProps = {
    noticeList:NoticeConfig[];
};

type NoticeConfig = {
    title:string;
    noticeType:string;
    id:string;
};

type NoticeContent = string;

enum NoticeType {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
    pending = 'pending',
}

const noticeList:NoticeConfig[] = [];
const localContainer = document.createElement('div');
document.body.appendChild(localContainer);

class Notice extends React.Component<NoticeProps, {}> {
    public render () {
        //todo:
        return (
            <div className="comp-common-notice">
                {this.props.noticeList.map((_notice) => {
                    return (
                        <div key={_notice.id} className={classnames('notice', _notice.noticeType)}>
                            {_notice.title}
                        </div>
                    );
                })}
            </div>
        );
    }
}

function addNotice(content:NoticeContent, type:string) : string {
    const id = uuid.v4();
    noticeList.push({
        title: content,
        noticeType: type,
        id: id,
    });
    if (noticeList.length > 6) {
        noticeList.shift();
    }
    render();
    setIdleTimeout(
        () => {
            const firstNotice = noticeList[0];
            if (!firstNotice) { return; }
            noticeList.shift();
            render();
        },
        3200,
    );
    return id;
}

function closeNotice (id:string) {
    for (let i = 0; i < noticeList.length; i++) {
        if (id === noticeList[i].id) {
            noticeList.splice(i, 1);
            render();
            return;
        }
    }
}

function render() {
    const localDom = (
        <Notice noticeList={noticeList}/>
    );
    ReactDOM.render(localDom, localContainer);
}

function success(content:NoticeContent) {
    return addNotice(content, NoticeType.success);
}
function info(content:NoticeContent) {
    return addNotice(content, NoticeType.info);
}
function warning(content:NoticeContent) {
    return addNotice(content, NoticeType.warning);
}
function error(content:NoticeContent) {
    return addNotice(content, NoticeType.error);
}
function pending(content:string) {
    return addNotice(content, NoticeType.pending);
}

export const notice =  {
    success,
    info,
    warning,
    error,
    pending,
    closeNotice,
    requestError: (err) => {
        try {
            const errorMsg = JSON.parse(err.message);
            if (errorMsg.msg) {
                return error(errorMsg.msg);
            } else {
                return error('未知错误');
            }
        } catch (e) {
            return error('未知错误');
        }
    },
};