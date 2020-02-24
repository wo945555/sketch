<?php
namespace App\Sosadfun\Traits;

use Cache;
use DB;

trait FAQObjectTraits{


    public function all_faqs()
    {
        return Cache::remember('all_faqs', 30, function () {
            return \App\Models\Helpfaq::all();
        });
    }

    public function clear_all_faqs()
    {
        Cache::forget('all_faqs');
    }

}
