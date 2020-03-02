<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\UserInfo;
use App\Models\User;
use APP\Models\Checkin;
use Carbon;

class CheckinTest extends TestCase
{

	/** @test */
    public function a_guest_can_not_check_in()
    {
		$this->get('api/qiandao')->assertStatus(401);
		$this->get('api/qiandao/complement')->assertStatus(401);
	}
	
	/** @test */
    // user can check in
    public function user_can_checkin()
    {
        $user = factory('App\Models\User')->create();
		$this->actingAs($user, 'api');
		
		$response = $this->get('api/qiandao')
			->assertStatus(200)
            ->assertJsonStructure([
                "code",
                "data" => [
					"type",
					"attributes" => [
						"levelup",
						"checkin_reward" => [
							"special_reward",
							"salt",
							"fish",
							"ham"
						]	
					],
					"info"
                ]
			]);

		$attributes = $response->decodeResponseJson()["data"]["attributes"];
		$expected = [
			"special_reward" => false,
			"salt" => 5,
			"fish" => 1,
			"ham" => 0
		];
		$this->assertEquals($expected, $attributes["checkin_reward"]);
		$this->assertEquals(false, $attributes["levelup"]);

		// check if UserInfo is updated in db
		$info = UserInfo::find($user->id);
        $this->assertEquals(1, $info->qiandao_max);
        $this->assertEquals(1, $info->qiandao_continued);
        $this->assertEquals(1, $info->qiandao_all);
		$this->assertEquals(5, $info->salt);
        $this->assertEquals(1, $info->fish);		
		$this->assertEquals(0, $info->ham);		
	}

	/** @test */
    // user cannot check in twice in the same day
    public function user_can_not_checkin_twice()
    {
		$user = factory('App\Models\User')->create();
		$this->actingAs($user, 'api');
		
		Carbon::setTestNow(Carbon::create(2020, 01, 10, 10));     
		$response = $this->get('api/qiandao')->assertStatus(200);
		Carbon::setTestNow(Carbon::create(2020, 01, 10, 11));
		$response = $this->get('api/qiandao')->assertStatus(409);
		Carbon::setTestNow(Carbon::create(2020, 01, 10, 12));
		$response = $this->get('api/qiandao')->assertStatus(409);
		Carbon::setTestNow(Carbon::create(2020, 01, 11, 10));	// a new day
		$response = $this->get('api/qiandao')->assertStatus(200);
		Carbon::setTestNow();
	}

	/** @test */
	public function user_checkin_continousely_for_10_days()
    {
		$user = factory('App\Models\User')->create();
		$this->actingAs($user, 'api');
		

		// check in at 10am for 10 days
		for ($x = 1; $x <= 10; $x++) {
			Carbon::setTestNow(Carbon::create(2020, 01, 0 + $x, 10));
			$response = $this->get('api/qiandao')->assertStatus(200);
			
			$checkin_result = $response->decodeResponseJson()["data"]["attributes"];
			$checkin_reward = $checkin_result["checkin_reward"];

			// check reward value
			if ($x != 10) {
				$expected = [
					"special_reward" => false,
					"salt" => 5,
					"fish" => 1,
					"ham" => 0
				];
				$this->assertEquals($expected, $checkin_reward);
			}
			else {
				// day 10
				$expected = [
					"special_reward" => true,
					"salt" => 15,
					"fish" => 3,
					"ham" => 0
				];
				$this->assertEquals($expected, $checkin_reward);
			}

			// check level up
			// on day 4 user should have 4*5 = 20 salt -> level 1
			if ($x == 4){
				$this->assertEquals(true, $checkin_result["levelup"]);
			}
		}

		// check db
		// after 10 days, user should have 
		// 5*9 + 15 = 60 salt, 
		// 1*9 + 3 = 12 fish
		$info = UserInfo::find($user->id);
        $this->assertEquals(10, $info->qiandao_max);
        $this->assertEquals(10, $info->qiandao_continued);
        $this->assertEquals(10, $info->qiandao_all);
		$this->assertEquals(60, $info->salt);
        $this->assertEquals(12, $info->fish);
		$this->assertEquals(0, $info->ham);
		
		$u = User::find($user->id);
		$this->assertEquals(1, $u["level"]);		

		$numberOfCheckinRecords = Checkin::where('user_id', $user->id)->count();
		$this->assertEquals(10, $numberOfCheckinRecords);
		Carbon::setTestNow();
	}
	
	/** @test */
    public function user_can_complement_checkin()
    {
		$user = factory('App\Models\User')->create();
		$this->actingAs($user, 'api');
		
		// no checkin_reward
		$this->get('api/qiandao/complement')->assertStatus(412);
		
		$user->info->qiandao_reward_limit = 3;
		$user->info->save();
		// no break before
		$this->get('api/qiandao/complement')->assertStatus(412);

		// check in continously for 5 days
		for ($x = 1; $x <= 5; $x++) {
			Carbon::setTestNow(Carbon::create(2020, 01, 0 + $x, 10));
			$this->get('api/qiandao')->assertStatus(200);
		}
		// break for 3 days
		// check in again for 6 days
		for ($x = 1; $x <= 6; $x++) {
			Carbon::setTestNow(Carbon::create(2020, 01, 8 + $x, 10));
			$response = $this->get('api/qiandao')->assertStatus(200);
			
			$info = $response->decodeResponseJson()["data"]["info"]["attributes"];
			$this->assertEquals($x, $info["qiandao_continued"]);
			$this->assertEquals($x + 5, $info["qiandao_all"]);
			$this->assertEquals(($x > 5 ? $x : 5), $info["qiandao_max"]);
			$this->assertEquals(5, $info["qiandao_last"]);
		}

		// complement
		Carbon::setTestNow(Carbon::create(2020, 01, 8 + 7, 10));
		$this->get('api/qiandao/complement')->assertStatus(200);
		Carbon::setTestNow(Carbon::create(2020, 01, 8 + 8, 10));
		$this->get('api/qiandao/complement')->assertStatus(412);
		
		// check db
		$info = UserInfo::find($user->id);
		$this->assertEquals(11, $info->qiandao_max);
        $this->assertEquals(11, $info->qiandao_continued);
		$this->assertEquals(11, $info->qiandao_all);
		$this->assertEquals(0, $info->qiandao_last);
		
		Carbon::setTestNow();
	}
}
