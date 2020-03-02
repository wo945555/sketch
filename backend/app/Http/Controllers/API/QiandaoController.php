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
        // QUESTION: why subHour(2), does it mean that a new day starts at 22:00?
        if($info->qiandao_at > Carbon::today()->subHours(2)->toDateTimeString()){
            return response()->error('已领取奖励，请勿重复签到', 409);
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
            return response()->error('补签额度不足', 412);
        }

        // QUESTION：我觉得这一段是错的额... qiandao_last记得是上一次断签是连续的日子
        // 假设用户先签到6天，断签，再签到8天。这个时候qiandao_last=6, qiandao_continued = 8
        // 用户应该也可以使用补签卡。 
        // if($info->qiandao_continued > $info->qiandao_last){
        //     return response()->error('你的连续签到天数超过了上次断签天数，无需补签', 412);
        // }
        
        if($info->qiandao_last == 0){
            return response()->error('未发现断签，无需补签', 412);
        }

        $user->complement_qiandao();
        return response()->success(new UserInfoResource($info));
    }
}
