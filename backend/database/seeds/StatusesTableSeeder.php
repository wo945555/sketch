<?php

use Illuminate\Database\Seeder;
use App\Models\Status;
use App\Models\Vote;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = factory(Status::class)->times(20)->create();
        $statuses->each(function($status){
            // seed votes
            $votes = factory(Vote::class)->create([
                'receiver_id' => $status->user_id,
                'votable_id' => $status->id,
                'votable_type' => 'status'
            ]);
        });
    }
}
