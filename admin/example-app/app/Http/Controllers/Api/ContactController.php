<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    function SendContactDetails(Request $request){
        $name=$request->input('name');
        $mobile=$request->input('mobile');
        $message=$request->input('message');
        $contact_time= date("h:i:sa");
        $contact_date= date("d-m-Y");

        $result= Contact::insert([
            'name'=>$name,
            'mobile'=>$mobile,
            'message'=>$message,
            'contact_date'=>$contact_date,
            'contact_time'=>$contact_time
        ]);

        return $result;
    }
}
