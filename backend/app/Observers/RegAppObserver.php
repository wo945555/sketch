<?php
namespace App\Observers;

use App\Models\RegistrationApplication;
use Cache;


/**
 * User observer
 */
class RegAppObserver
{
    public function updated(RegistrationApplication $regapp)
    {
        Cache::put("cachedRegApp.{$regapp->email}", $regapp, 30);
    }

}
