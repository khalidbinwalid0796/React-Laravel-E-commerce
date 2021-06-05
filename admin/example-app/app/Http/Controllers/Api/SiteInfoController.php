<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Siteinfo;

class SiteInfoController extends Controller
{
    function GetSiteInfo(){
       $result= Siteinfo::all();
       return response()->json($result);
       //return $result;
    }
}
