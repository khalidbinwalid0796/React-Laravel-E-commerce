<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;

class CategoryController extends Controller
{
    function GetCatwithSubcat(){

       $Category=  Category::all();
       $CatSubcatArray=[];

        foreach ($Category as $value){
            $SubCategory=Subcategory::Where('category_id',$value['id'])->get();
            $item=[
                'CategoryId'=>$value['id'],
                'CategoryName'=>$value['cat_name'],
                'CategoryImg'=>$value['cat_image'],
                'SubCategory'=>$SubCategory
            ];
            array_push($CatSubcatArray,$item);
        }

        return $CatSubcatArray;
    }

}
