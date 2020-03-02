<?php

namespace App\Models\Traits;

use Carbon;

trait QiandaoTrait
{
	public function qiandao(){
		$info = $this->info;

		// 计算连续签到天数
		// QUESTION: why not subhour 2 here
		if ($info->qiandao_at > Carbon::now()->subDays(2)) {
			$info->qiandao_continued+=1;
		}else{
			$info->qiandao_last = $info->qiandao_continued;
			$info->qiandao_continued=1;
		}
		if($info->qiandao_continued>$info->qiandao_max){$info->qiandao_max = $info->qiandao_continued;}
		$info->qiandao_all+=1;
		\App\Models\Checkin::create(['user_id' => $this->id]);

		// 更新签到天数
		$info->qiandao_at = Carbon::now();
		
		$data = [
			'levelup' => false,
			'checkin_reward' => [],
			'user_info' => $info
		];

		//根据连续签到时间发放奖励
		$reward_base = 1;
		$special_reward = false;
		if(($info->qiandao_continued>=5)&&($info->qiandao_continued%10==0)){
			$reward_base = intval($info->qiandao_continued/10)+2;
			if($reward_base > 5){$reward_base = 5;}
			$special_reward = true;
		}
		$info->rewardData(5*$reward_base, $reward_base, 0);

		$data['checkin_reward'] = [
			'special_reward' => $special_reward,
			'salt' => 5*$reward_base,
			'fish' => $reward_base,
			'ham' => 0,
		];


		// 更新每日私信数量
		$info->message_limit = $this->level-4;
		$info->save();

		$data['levelup'] = $this->checklevelup();

		// frontend can detect if user can complement checkin on its own
		return $data;
	}

	// precondition: user has qiandao_reward_limit and qiandao_continued < qiandao_last
	public function complement_qiandao()
    {
				$info = $this->info;
				$info->qiandao_reward_limit-=1;
				// QUESTION: 原代码是$this->qiandao_continued = $this->qiandao_last+1;
				// 我觉得原来的是错的
				$info->qiandao_continued = $info->qiandao_last + $info->qiandao_continued;
				if($info->qiandao_continued>$info->qiandao_max){
					$info->qiandao_max = $info->qiandao_continued;
				}
        $info->qiandao_last = 0;
        $info->save();
    }
}
