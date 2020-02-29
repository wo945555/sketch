<?php

use Illuminate\Database\Seeder;
use App\Models\Quote;
use App\Models\Vote;

class QuotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quotes1 = factory(Quote::class)->times(20)->create();
        $quotes1->each(function ($quote) {
            // seed votes
            $votes = factory(Vote::class)->create([
                'receiver_id' => $quote->user_id,
                'votable_id' => $quote->id,
            ]);
        });
        $quotes2 = factory(Quote::class)->times(20)->create([
            'approved' => false,
        ]);
    }
}
