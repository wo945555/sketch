<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RewardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $author = [];
        $receiver = [];
        if($this->showUser()){
            $author = new UserBriefResource($this->whenLoaded('author'));
            $receiver = new UserBriefResource($this->whenLoaded('receiver'));
        }

        return [
            'type' => 'reward',
            'id' => (int)$this->id,
            'attributes' => [
                'rewardable_type' => (string)$this->rewardable_type,
                'rewardable_id' => (int)$this->rewardable_id,
                'reward_type' => (string)$this->reward_type,
                'reward_value' => (int)$this->reward_value,
                'created_at' => (string)$this->created_at,
                'deleted_at' => (string)$this->deleted_at,
            ],
            'author' => $author,
            'receiver' => $receiver,
        ];
    }
    private function isOwnReward(){
        return auth('api')->id()===$this->user_id;
    }
    private function isRewardForMe(){
        return auth('api')->id()===$this->receiver_id;
    }

    private function showUser(){
        return $this->isOwnReward()||$this->isRewardForMe()||(auth('api')->check()&&auth('api')->user()->isAdmin());
    }
}
