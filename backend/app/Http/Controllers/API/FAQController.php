<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Carbon;
use Cache;
use DB;
use App\Models\Helpfaq;
use App\Http\Resources\FAQResource;

use App\Sosadfun\Traits\FAQObjectTraits;


class FAQController extends Controller
{
    use FAQObjectTraits;

    public function __construct()
    {
        $this->middleware('admin')->except('index');
    }

    public function index()
    {
        $faqs = $this->find_faqs();
        foreach($faqs as $key => $value)
        {
            $faqs[$key] = FAQResource::collection($faqs[$key]);
        }
        return response()->success($faqs);
    }

    public function store(Request $request)
    {
        if (!auth('api')->user()->isAdmin()) {abort(403,'管理员才可以创建FAQ');}
        $validatedData = $request->validate([
            'key' => 'required|string|min:1|max:6',
            'question' => 'required|string|min:1|max:180',
            'answer'=>'required|string|min:1|max:2000',
        ]);
        $faq = Helpfaq::create($request->only('key','question','answer'));
        $this->clear_all_faqs();
        return response()->success(new FAQResource($faq));
    }

    public function update(Request $request, $id)
    {
        $faq = Helpfaq::find($id);
        if (!$faq) {abort(404);}
        if (!auth('api')->user()->isAdmin()) {abort(403,'管理员才可以修改FAQ');}
        $validatedData = $request->validate([
            'question' => 'required|string|min:1|max:180',
            'answer'=>'required|string|min:1|max:2000',
        ]);
        $faq->update($request->only('question','answer'));
        $this->clear_all_faqs();
        return response()->success(new FAQResource($faq));
    }

    public function destroy($id)
    {
        $faq = Helpfaq::find($id);
        if (!$faq){abort(404);}
        if (!auth('api')->user()->isAdmin()) {abort(403,'管理员才可以刪除FAQ');}
        $faq->delete();
        $this->clear_all_faqs();
        return response()->success([
            'message' =>[
                'success' => "成功删除FAQ",
            ],
           'faq_id' => $id,
       ]);
    }

}
