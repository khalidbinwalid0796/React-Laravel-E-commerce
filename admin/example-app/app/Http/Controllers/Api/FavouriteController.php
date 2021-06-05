<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favourite;
use App\Models\Product;

class FavouriteController extends Controller
{
    function addFav(Request $request){
       $product_code= $request->product_code;
       $email= $request->email;
       $ProductDetails= Product::Where('product_code', $product_code)->get();
       $result= Favourite::insert([
           'title'=>$ProductDetails[0]['title'],
           'image'=>$ProductDetails[0]['image'],
           'product_code'=>$product_code,
           'email'=>$email,
        ]);
       return $result;
    }
    
    function favList(Request $request){
        $email= $request->email;
        $result=Favourite::Where('email',$email)->get();
        return  $result;
    }

    function removeFavItem(Request $request){
        $product_code= $request->product_code;
        $email= $request->email;
        $result=Favourite::Where('email',$email)->Where('product_code',$product_code)->delete();
        return  $result;
    }
}
