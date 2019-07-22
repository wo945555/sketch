<br>
<div class="font-2">
    <span class="glyphicon glyphicon-user {{$user->role.'-symbol'}}"></span>{{ $user->name }}
</div>
<div class="font-5">
    <span >Lv.{{ $user->level }}</span>
    @if($user->title&&$user->title->name)
        <span class="maintitle title-{{$user->title->style_id}}">{{ $user->title->name }}</span>
    @endif
    @if($user->no_posting)
    <span class="badge bianyuan-tag badge-tag">禁言中</span>
    @endif
    @if($user->no_logging)
    <span class="badge bianyuan-tag badge-tag">封禁中</span>
    @endif
    @if($user->isOnline())
    <span class="badge">在线</span>
    @endif
</div>
<div class="text-center font-4">
    <span><a href="{{route('user.followings', $user->id)}}">关注{{ $info->following_count }}</a></span>&nbsp;&nbsp;&nbsp;&nbsp;
    <span><a href="{{route('user.followers', $user->id)}}">粉丝{{ $info->follower_count }}</a></span>
</div>

@if(Auth::check())
<div class="text-center">
    @if(Auth::user()->isAdmin())
    <a href="{{route('admin.userform', $user->id)}}"class="btn btn-md btn-danger sosad-button admin-button">管理该用户</a>&nbsp;&nbsp;&nbsp;
    @endif
    @if(Auth::id()!=$user->id)
    <a href="{{route('message.dialogue', $user->id)}}" class="btn btn-md btn-primary sosad-button-control" >私信</a>&nbsp;&nbsp;&nbsp;
    <button type="button" class="btn btn-md btn-primary sosad-button-control {{'follow'.$user->id}} {{Auth::user()->isFollowing($user->id) ? 'hidden':''}}" onclick="follow({{$user->id}})">关注</button>
    <button type="button" class="btn btn-md btn-danger sosad-button {{'cancelfollow'.$user->id}} {{Auth::user()->isFollowing($user->id) ? '':'hidden'}}" onclick="cancelfollow({{$user->id}})">取消关注</button>&nbsp;&nbsp;&nbsp;
    @endif
    <a href="{{$info->default_box_id===0?'#':route('thread.show', $info->default_box_id)}}" class="btn btn-md btn-primary sosad-button-control" {{$info->default_box_id===0? 'disabled':''}}>问题箱</a>
    @if(Auth::user()->isAdmin())
    &nbsp;&nbsp;&nbsp;<a href="{{route('administrationrecords', ['user_id'=>$user->id])}}"class="btn btn-md btn-danger sosad-button admin-button">被管理记录</a>
    @endif
</div>
@endif
<div class="text-center stats">

    <div class="font-5">
        <span>盐粒：{{ $info->salt }}</span>&nbsp;&nbsp;&nbsp;
        <span>咸鱼：{{ $info->fish }}</span>&nbsp;&nbsp;&nbsp;
        <span>火腿：{{ $info->ham }}</span>
    </div>
    @if(Auth::check()&&(Auth::user()->isAdmin()||Auth::id()===$user->id))
    <div class="font-5">
        <span>连续签到：{{ $info->qiandao_continued }}天</span>&nbsp;&nbsp;&nbsp;
        <span>总签到：{{ $info->qiandao_all }}天</span>
    </div>
    <div class="font-5">
        <span>最多连续签到：{{ $info->qiandao_max }}天</span>&nbsp;&nbsp;&nbsp;
        <span>最后签到时间：{{ $user->qiandao_at->diffForHumans() }}</span>
    </div>
    @endif
</div>
@if($intro&&$intro->body)
<div class="h5 text-center">
    <span>{!! StringProcess::wrapParagraphs($intro->body) !!}</span>
</div>
@endif
