<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class VoteResource extends JsonResource
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
        if ($this->showUser()){
            $author = new UserBriefResource($this->whenLoaded('author'));
            $receiver = new UserBriefResource($this->whenLoaded('receiver'));
        }
        return [
            'type' => 'vote',
            'id' => (int)$this->id,
            'attributes' => [
                'votable_type' => (string)$this->votable_type,
                'votable_id' => (int)$this->votable_id,
                'attitude_type' => (string)$this->attitude_type,
                'created_at' => (string)$this->created_at,
            ],
            'author' => $author,
            'receiver' => $receiver,
        ];
    }

    private function isUpvote($attitude_type){
        return $attitude_type === 'upvote';
    }

    private function isOwnVote($user_id){
        return auth('api')->id()===$user_id;
    }

    private function showUser(){
        return $this->isUpvote($this->attitude_type)||$this->isOwnVote($this->user_id)||auth('api')->user()->isAdmin();
    }

}
