<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    function postReview(Request $request){
        $product_name=  $request->input('product_name');
        $product_code=  $request->input('product_code');
        $email=  $request->input('email');
        $reviewer_photo=$request->input('reviewer_photo');
        $reviewer_name=$request->input('reviewer_name');
        $reviewer_rating=$request->input('reviewer_rating');
        $reviewer_comments=$request->input('reviewer_comments');
        $result= Review::insert([
            'product_code'=>$product_code,
            'product_name'=>$product_name,
            'email'=>$email,
            'reviewer_photo'=>$reviewer_photo,
            'reviewer_name'=> $reviewer_name,
            'reviewer_rating'=> $reviewer_rating,
            'reviewer_comments'=>$reviewer_comments,
        ]);
        return $result;
    }

    function reviewList(Request $request){
        $product_code=  $request->product_code;
        $result= Review::where('product_code',$product_code)->orderBy('id','desc')->limit(7)->get();
        return $result;
    }
}
