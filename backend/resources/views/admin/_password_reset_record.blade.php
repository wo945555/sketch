<b>密码修改记录ID：</b>{{$record->id}}&nbsp;<b>修改时间：</b>{{$record->created_at->setTimezone('Asia/Shanghai')}}&nbsp;<b>修改IP：</b>{!! StringProcess::ip_link($record->ip_address) !!}<span class="{{$record->admin_reset? 'admin-symbol':''}}">{{$record->admin_reset? '管理员重置':''}}</span><br>
