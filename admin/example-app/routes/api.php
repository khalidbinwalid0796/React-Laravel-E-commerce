<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VisitorController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SiteInfoController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductOrderController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\ReviewController;

//login route
Route::post('/login',[AuthController::class,'login']);

//register route
Route::post('/register',[AuthController::class,'register']); 

//curent user
Route::get('/user',[UserController::class,'user'])->middleware('auth:api');

//VisitorDetails
Route::get('/VisitorDetails',[VisitorController::class,'VisitorDetails']);

//ContactDetails
Route::post('/SendContactDetails',[ContactController::class,'SendContactDetails']);

//SiteInfo
Route::get('/GetSiteInfo',[SiteInfoController::class,'GetSiteInfo']);

//category with subcategory
Route::get('/GetCatwithSubcat',[CategoryController::class,'GetCatwithSubcat']);

//Slider Info
Route::get('/GetSliderInfo',[SliderController::class,'GetSliderInfo']);

//Product 
Route::get('/ProductByCategory/{category_id}/{CategoryName}',[ProductController::class,'ProductByCategory']);
Route::get('/ProductBySubCategory/{category_id}/{subcategory_id}/{subcat_name}',[ProductController::class,'ProductBySubCategory']);
Route::get('/ProductByRemark/{remark}',[ProductController::class,'ProductByRemark']);
Route::get('/ProductDetails/{product_code}',[ProductController::class,'ProductDetails']);
Route::get('/ProductBySearch/{search_key}',[ProductController::class,'ProductBySearch']);

	//SuggestedProduct
Route::get('/SimilarProduct/{subcategory_id}',[ProductController::class,'SimilarProduct']);

//add to cart
Route::post('/addToCart/{product_code}',[ProductOrderController::class,'AddToCart']);
Route::get('/CartCount/{email}',[ProductOrderController::class,'CartCount']);
Route::get('/CartList/{email}',[ProductOrderController::class,'CartList']);
Route::get('/RemoveCartList/{id}',[ProductOrderController::class,'RemoveCartList']);
Route::get('/CartItemPlus/{id}/{quantity}/{price}',[ProductOrderController::class,'CartItemPlus']);
Route::get('/CartItemMinus/{id}/{quantity}/{price}',[ProductOrderController::class,'CartItemMinus']);
	//order
Route::post('/CartOrder',[ProductOrderController::class,'CartOrder']);
Route::get('/OrderListByUser/{email}',[ProductOrderController::class,'OrderListByUser']);

// FavList
Route::get('/removeFavItem/{product_code}/{email}',[FavouriteController::class,'removeFavItem']);
Route::get('/favList/{email}',[FavouriteController::class,'favList']);
Route::get('/addFav/{product_code}/{email}',[FavouriteController::class,'addFav']);

// Review
Route::post('/postReview',[ReviewController::class,'postReview']);
Route::get('/reviewList/{product_code}',[ReviewController::class,'reviewList']);