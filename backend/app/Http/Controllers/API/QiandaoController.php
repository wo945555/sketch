<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CheckinResource;
use App\Http\Resources\UserInfoResource;
use Auth;
use Cache;
use Carbon;

class QiandaoController extends Controller
{

    public function qiandao()
    {
        $user = auth('api')->user();
        if (!$user) { return response()->error('用户未登录。', 401); }
        $info = $user->info;
        // QUESTION: why subHour(2)
        if($info->qiandao_at > Carbon::today()->subHours(2)->toDateTimeString()){
            return response()->error('你已领取奖励，请勿重复签到', 409);
        }
        $checkin_result = $user->qiandao();
        return response()->success(new CheckinResource($checkin_result));
    }

    public function complement_qiandao()
    {
        // 补签
        $user = auth('api')->user();
        if (!$user) { return response()->error('用户未登录。', 401); }
        $info = $user->info;
        if($info->qiandao_reward_limit <= 0){
            return response()->error('你的补签额度不足', 412);
        }
        if($info->qiandao_continued > $info->qiandao_last){
            return response()->error('你的连续签到天数超过了上次断签天数，无需补签', 412);
        }

        $user->complement_qiandao();
        return response()->success(new UserInfoResource($info));
    }
}
