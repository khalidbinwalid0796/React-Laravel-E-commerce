<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
	//login method
    public function login(Request $request){
    	try{
	    	if(Auth::attempt($request->only('email','password'))){
	    		$user = Auth::user();
	    		$token = $user->createToken('Token Name')->accessToken;
	    		return response([
	    			'message'=>"successfully login",
	    			'token'=>$token,
	    			'user'=>$user
	    		],200);
	    	}
    	}catch(Exception $exception){
    		return response([
    			'message'=>$exception->getMessage()
    		],400);
    	}
		return response([
			'message'=>"Invalid email or password"
		],401);
    }

    //register method(custom)
    public function register(RegisterRequest $request){
    try{
    	$user = user::create([
	    'name' => $request->name,
	    'email' => $request->email,
	    'mobile' => $request->mobile,
	    'password' => Hash::make($request->password),
	]);
    	$token = $user->createToken('Token Name')->accessToken;
		    return response([
				'message'=>"successfully registration",
				'token'=>$token,
				'user'=>$user
			],200);
    }catch(Exception $exception){
    		return response([
    			'message'=>$exception->getMessage()
    		],401);
    	}
    }
}
