<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;

class SliderController extends Controller
{
   function GetSliderInfo(){
      $result= Slider::all();
      return $result;
   }
}
