<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CheckinResource;
use App\Http\Resources\UserInfoResource;
use App\Sosadfun\Traits\QiandaoTrait;
use Auth;
use Cache;
use Carbon;

class QiandaoController extends Controller
{
    use QiandaoTrait;

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function qiandao()
    {
        $user = auth('api')->user();
        $info = $user->info;
        // a new day starts at 22:00
        if(Cache::has('checkin-user-'.$user->id) ||
            $info->qiandao_at > Carbon::today()->subHours(2)->toDateTimeString()) {
            return response()->error('已领取奖励，请勿重复签到', 409);
        }
        Cache::put('checkin-user-'.$user->id, true, 5);
        $info = $user->info;
        $checkin_result = $this->checkin($user);
        return response()->success(new CheckinResource($checkin_result));
    }

    public function complement_qiandao()
    {
        // 补签
        $user = auth('api')->user();
        $info = $user->info;
        if($info->qiandao_reward_limit <= 0){
            return response()->error('补签额度不足', 412);
        }

        if($info->qiandao_continued >= $info->qiandao_last){
            return response()->error('你的连续签到天数不少与上次断签天数，无需补签', 412);
        }

        if($info->qiandao_last == 0){
            return response()->error('未发现断签，无需补签', 412);
        }

        $this->complement_checkin($user);
        return response()->success(new UserInfoResource($info));
    }
}
