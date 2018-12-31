<?php
return [
    '200' => 'success',
    '400' => 'not found',
    '401' => 'unauthorised',//未登陆，或未能获得相关频道的发布授权，或不具有修改资格
    '403' => 'permission denied',
    '404' => 'not found',
    '405' => 'method not allowed',
    '409' => 'data conflict', //数据内容重复
    '422' => 'validation failed',//不符合规则的内容，
    '481' => 'classification data corruption', //分类性数据冲突，比如大类信息和频道信息不能对应匹配，或不能检索到对应的大类信息，或许可以考虑更新大类信息；或者，选择回复的
    '482' => 'related item not applicable', //选择回复/附件的对象并不存在或不可用(比如在讨论帖A中回复讨论帖B的回帖)
    '488' => 'forbidden word',//内容中违禁词超过了运作能力（比如标题因违禁词存在变成空白字串）
    '499' => 'is blocked',//用户因不当行为被站内封禁
];
