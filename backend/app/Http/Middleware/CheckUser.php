<?php
namespace App\Http\Middleware;
use Closure;
use Auth;
class CheckUser
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
        return $next($request);
    }
}
