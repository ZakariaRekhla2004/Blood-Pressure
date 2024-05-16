<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
// use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'forgetPassword', 'checkCredentias']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // $token=JWTAuth::attempt({
        //     'email' => $request->email,
        //     'password' =>  $request->password,
        // })
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token1 = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = User::where("email", $payload["email"])->first();
        PersonalAccessToken::create([
            'tokenable_id' => auth('api')->user()->id,
            'tokenable_type' => User::class,
            'name' => 'JWT Token',
            'token' => $token1,
            // Add other fields as needed
        ]);
        // $token2 = $user->createToken("web")->plainTextToken;
        $token = $this->createNewToken($token1);;
        $authRes = array_merge($user->toArray(), ["token" => $token1]);
        return response()->json(
            [
                "user1" => $authRes,
                'token' => $token1,
                'user' =>  auth('api')->user(),
                "_id" =>auth('api')->user()->getAuthIdentifier(),
                // 'username' => auth('api')->user()->name,
            ],
            200
        );
        // return response()->json(['token' => $token], 200);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(
            array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            )
        );
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            "status" => 201,
        ], 201);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkCredentias(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        try {
            $user = User::where("email", $payload["email"])->first();
            if ($user) {
                // * Check password
                if (!Hash::check($payload["password"], $user->password)) {
                    return response()->json(["status" => 401, "message" => "Invalid credentials."]);
                }
                return response()->json(["status" => 200, "message" => "Loggedin succssfully!"],200);
            }
            return response()->json(["status" => 401, "message" => "No account found with these credentials."]);
        } catch (\Exception $err) {
            Log::info("user_register_err =>" . $err->getMessage());
            return response()->json(["status" => 500, "message" => "Something went wrong!"], 500);
        }
    }

    // public function checkCredentials(Request $request)
    // {
    //     print_r("hello");
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 422,
    //             'message' => 'Validation failed',
    //             'errors' => $validator->errors(),
    //         ], 422);
    //     }
    //     try {
    //         $user = User::where('email', $request->email)->first();

    //         if (!$user) {
    //             return response()->json([
    //                 'status' => 401,
    //                 'message' => 'No account found with these credentials.',
    //             ], 401);
    //         }
    //         if (!Hash::check($request->password, $user->password)) {
    //             return response()->json([
    //                 'status' => 401,
    //                 'message' => 'Invalid credentials.',
    //             ], 401);
    //         }

    //         return response()->json([
    //             'status' => 200,
    //             'user' => $user,
    //             'message' => 'Logged in successfully!',
    //         ], 200);
    //     } catch (\Exception $err) {
    //         return response()->json([
    //             'status' => 500,
    //             'message' => 'Something went wrong!',
    //         ], 500);
    //     }
    // }

    /**
     * forgetPassword a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function forgetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // Find the user by email
        $user = User::where('email', $request->input('email'))->first();

        // Check if user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update user password
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json([
            'message' => 'User password successfully updated',
            'user' => $user
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {

        auth()->logout();
        return response()->json(['message' => 'User successfully signed out'],200);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth('api')->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth('auth:api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}