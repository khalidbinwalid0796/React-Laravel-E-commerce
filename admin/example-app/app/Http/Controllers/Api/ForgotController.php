<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\User;
use App\Mail\ForgotMail;
use Mail;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ResetRequest;
use App\Http\Requests\ForgotRequest;

class ForgotController extends Controller
{
    //Forgot Password
    public function forgotPassword(ForgotRequest $request){
    	$email = $request->email;
    	if(User::where('email',$email)->doesntExist()){
    		return response([
    			'message' => 'Email Invalid'
    		],404);
    	}

    	//generate random token
    	$token = rand(10,100000);
    	try{
	     	DB::table('password_resets')->insert([
	    		'email'=>$email,
	    		'token'=>$token 
	    	]);

	    	Mail::to($email)->send(new ForgotMail($token)); //mail send to user
	    	return response([
	    		'message' => 'Reset Password mail send on your email'
	    	],200);   		
    	}catch(Exception $exception){
    		return response([
    			'message'=>$exception->getMessage()
    		],400);
    	}

    }

    //reset password
    public function resetPassword(ForgotRequest $request){
        $email = $request->email;
        $token = $request->token;
        $password = Hash::make($request->password);
        $emailcheck = DB::table('password_resets')->where('email',$email)->first();
        $tokencheck = DB::table('password_resets')->where('token',$token)->first();

        if(!$emailcheck){
            return response([
                'message'=>"Email not found"
            ],401);
        }
        if(!$tokencheck){
            return response([
                'message'=>"Token not found"
            ],401) ;           
        }

        DB::table('users')->where('email',$email)->update(['password'=>$password]);
        DB::table('password_resets')->where('email',$email)->delete();
        return response([
            'message'=>"Password changed successfully"
        ],200) ;
    }
}
