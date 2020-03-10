<?php
namespace App\Http\Middleware;
use Closure;
use Auth;
class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!auth('api')->check()) {
            return response()->error('用户未登录', 401);
        }
        if(!auth('api')->user()->isAdmin()){
            return response()->error('需要管理员权限', 403);
        }
        return $next($request);
    }
}
