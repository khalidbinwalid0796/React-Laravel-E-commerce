<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Productdetails;

class ProductController extends Controller
{
    function ProductByRemark(Request $request){
        $remark= $request->remark;
        $ProductList=Product::Where('remark',$remark)->get();
        return $ProductList;
    }

    function ProductByCategory(Request $request){
        $category_id= $request->category_id;
        $ProductList=Product::Where('category_id',$category_id)->get();
        return $ProductList;
    }

    function ProductBySubCategory(Request $request){
        $category_id= $request->category_id;
        $subcategory_id= $request->subcategory_id;
        $ProductList=Product::Where('category_id',$category_id)
        			->Where('subcategory_id',$subcategory_id)
        			->get();
        return $ProductList;
    }

    function ProductDetails(Request $request){

        $product_code=$request->product_code;

        $ProductDetails= Productdetails::Where('product_code',$product_code)->get();
        $ProductList= Product::Where('product_code',$product_code)->get();

        $item=[
            'ProductDetails'=>$ProductDetails,
            'ProductList'=>$ProductList,
        ];

        return $item;

    }

    function ProductBySearch(Request $request){
        $search_key= $request->search_key;
        $ProductList=Product::Where('title','LIKE',"%{$search_key}%")->get();
        return $ProductList;
    }

    function SimilarProduct(Request $request){
        $subcategory_id= $request->subcategory_id;
        $ProductList=Product::Where('subcategory_id',$subcategory_id)->orderBy('id','desc')->limit(12)->get();
        return $ProductList;
    }
}
