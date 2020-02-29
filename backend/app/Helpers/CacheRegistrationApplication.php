<?php

namespace App\Helpers;

use App\Models\RegistrationApplication;
use Cache;

class CacheRegistrationApplication{ //cache-RegApp class
    public static function registrationApplication($email){
        if(!$email){return;}

        return Cache::remember('cachedRegApp.'.$email, 30, function() use($email) {
            $regapp = RegistrationApplication::on('mysql::write')->where('email',$email)->first();
            return $regapp;
        });
    }

    public static function clearRegistrationApplication($email)
    {
        Cache::forget('cachedRegApp.'.$email);
    }

}
