<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class JwtMiddleware
{

    public function handle($request, Closure $next)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
    } catch (JWTException $e) {
        if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['status' => 'error', 'message' => 'Token expired'], 401);
        } elseif ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json(['status' => 'error', 'message' => 'Token invalid'], 401);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Token not provided'], 401);
        }
    }

    return $next($request);
}
}
