<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Auth;
use App\Models\Tag;
use ConstantObjects;
use App\Http\Resources\TagResource;
use DB;
use App\Http\Resources\ThreadBriefResource;

// QUESTION: as we are using soft delete for tags, probably we should add a route to restore deleted tags
// consider the case:
//    1. user creates tag "A",
//    2. user deletes tag "A"
//    3. user creates tag "A" again -> will be rejected as the name has already been used
// probably should add route "restore" for this case
class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'])
            ->except('index','show');
    }

    public function index()
    {
        $tag_range = ConstantObjects::organizeBookSelectorTags();
        $tagsGroups = [];
        foreach($tag_range as $tagType=>$tags){
            $tagsGroups[$tagType] = TagResource::collection($tags);
        }
        return response()->success(['tags' => $tagsGroups]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'tag_name' => 'required|string|max:10|unique:tags',
            'tag_explanation' => 'nullable|string|max:190',
            'tag_type' => 'required|string|max:10',
            'is_bianyuan' => 'required|boolean',
            'is_primary' => 'required|boolean',
            'channel_id' => 'required|numeric',
            'parent_id' => 'required|numeric',
        ]);
        if ($request->parent_id > 0){
            $parent = ConstantObjects::findTagProfile($request->parent_id);
            if (!$parent) {
                return response()->error('父标签不存在', 412);
            }
        }
        $tag_data=$request->only('tag_name', 'tag_explanation', 'channel_id', 'parent_id', 'tag_type', 'is_bianyuan','is_primary');
        $tag = Tag::create($tag_data);
        ConstantObjects::refreshBookTags();
        if($tag->parent_id>0){
            ConstantObjects::refreshTagProfile($tag->parent_id);
        }
        return response()->success(new TagResource($tag));
    }

    public function show($id)
    {
        $tag = ConstantObjects::findTagProfile($id);
        if(!$tag) return response()->error('标签不存在', 404);
        return response()->success(new TagResource($tag));
    }

    public function update(Request $request, $id)
    {
        // code clones in update and store, probably refactor out a common method
        $tag = ConstantObjects::findTagProfile($id);
        if(!$tag){return response()->error('标签不存在', 404);}

        $this->validate($request, [
            'tag_name' => 'required|string|max:10',
            'tag_explanation' => 'nullable|string|max:190',
            'tag_type' => 'required|string|max:10',
            'is_bianyuan' => 'required|boolean',
            'is_primary' => 'required|boolean',
            'channel_id' => 'required|numeric',
            'parent_id' => 'required|numeric',
        ]);
        if ($request->parent_id > 0){
            $parent = ConstantObjects::findTagProfile($request->parent_id);
            if (!$parent) {
                return response()->error('父标签不存在', 412);
            }
        }
        $tag_data=$request->only('tag_name','tag_explanation','channel_id','parent_id','tag_type','is_bianyuan','is_primary');
        $tag->update($tag_data);
        ConstantObjects::refreshTagProfile($id);
        if($tag->parent_id>0){
            ConstantObjects::refreshTagProfile($tag->parent_id);
        }
        return response()->success(new TagResource($tag));
    }

    public function destroy($id)
    {
        $tag = ConstantObjects::findTagProfile($id);
        if(!$tag){return response()->error('标签不存在', 404);}
        if ($tag->children()->count() > 0) {
            return response()->error('请先删除子标签', 412);
        }
        DB::transaction(function()use($tag){
            $tag->threads()->detach();
            $tag->posts()->detach();
            $tag->delete();
        });
        ConstantObjects::refreshBookTags();
        ConstantObjects::refreshTagProfile($id);
        if($tag->parent_id>0){
            ConstantObjects::refreshTagProfile($tag->parent_id);
        }
        return response()->success('成功删除');
    }
}
