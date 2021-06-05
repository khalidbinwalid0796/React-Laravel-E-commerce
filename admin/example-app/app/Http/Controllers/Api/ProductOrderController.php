<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;

class ProductOrderController extends Controller
{
    function AddToCart(Request $request){
        $color=$request->input('color');
        $size=$request->input('size');
        $quantity=$request->input('quantity');
        $email=$request->input('email');
        $product_code=$request->product_code;

        $ProductDetails= Product::Where('product_code',$product_code)->get();
        $price=$ProductDetails[0]['price'];
        $special_price=$ProductDetails[0]['special_price'];
        if($special_price=="NA"){
            $total_price=$price*$quantity;
            $unit_price=$price;
        }
        else{
            $total_price=$special_price*$quantity;
            $unit_price= $special_price;
        }

        $check=Cart::where('email',$email)->where('product_code',$product_code)->first();

        if ($check) {   
            return response()->json(['error' => 'Product Already has on Cart']);       
        }else{         
            $data=array();
            $data['img']=$ProductDetails[0]['image'];
            $data['product_name']=$ProductDetails[0]['title'];
            $data['product_code']=$product_code;
            $data['shop_name']=$ProductDetails[0]['shop_name'];
            $data['shop_code']=$ProductDetails[0]['shop'];
            $data['product_info']="Color: ". $color." Size: ".$size;
            $data['product_quantity']=$quantity;
            $data['unit_price']=$unit_price;
            $data['total_price']=$total_price;
            $data['email']=$email;
            Cart::insert($data);

         return response()->json(['success' => 'Successfully Added To Cart']);         
        }

    }

    function CartCount(Request $request){
        $email=$request->email;
        $result=Cart::Where('email',$email)->count();
        return $result;
    }

    function CartList(Request $request){
        $email=$request->email;
        $result=Cart::Where('email',$email)->get();
        return $result;
    }
    function RemoveCartList(Request $request){
        $id=$request->id;
        $result=Cart::Where('id',$id)->delete();
        return $result;
    }

    function CartItemPlus(Request $request){
        $id=$request->id;
        $quantity=$request->quantity;
        $price=$request->price;
        $newQuantity=$quantity+1;
        $total_price=$newQuantity*$price;
        $result=Cart::Where('id',$id)->update(['product_quantity' => $newQuantity, 'total_price' => $total_price]);
        return $result;
    }
    function CartItemMinus(Request $request){
        $id=$request->id;
        $quantity=$request->quantity;
        $price=$request->price;
        $newQuantity=$quantity-1;
        $total_price=$newQuantity*$price;
        $result=Cart::Where('id',$id)->update(['product_quantity' => $newQuantity, 'total_price' => $total_price]);
        return $result;
    }

    function CartOrder(Request $request){
        $city=  $request->input('city');
        $paymentMethod=  $request->input('paymentMethod');
        $yourName=  $request->input('yourName');
        $deliveryAddress=  $request->input('deliveryAddress');
        $email=  $request->input('email');
        $invoice_no= $request->input('invoice_no');
        $ShippingPrice= $request->input('ShippingPrice');

        date_default_timezone_set("Asia/Dhaka");
        $request_time= date("h:i:sa");
        $request_date= date("d-m-Y");

        $CartList=Cart::Where('email',$email)->get();
        $cartInsertDeleteResult="";
        foreach($CartList as $CartListItem) {
            $resultInsert= Order::insert([
                'invoice_no'=>"C".$invoice_no,
                'product_name'=>$CartListItem['product_name'],
                'product_code'=>$CartListItem['product_code'],
                'shop_name'=> $CartListItem['shop_name'],
                'shop_code'=>$CartListItem['shop_code'],
                'product_info'=>$CartListItem['product_info'],
                'product_quantity'=>$CartListItem['product_quantity'],
                'unit_price'=>$CartListItem['unit_price'],
                'total_price'=> $CartListItem['total_price'],
                'email'=> $CartListItem['email'],
                'name'=>$yourName,
                'payment_method'=>$paymentMethod,
                'delivery_address'=>$deliveryAddress,
                'city'=>$city,
                'delivery_charge'=>$ShippingPrice,
                'order_date'=>$request_date,
                'order_time'=>$request_time,
                'order_status'=>"Pending",
            ]);

            if($resultInsert==1){
                $resultDelete= Cart::Where('id',$CartListItem['id'])->delete();
                if($resultDelete==1){
                    $cartInsertDeleteResult=1;
                }
                else{
                    $cartInsertDeleteResult=0;
                }

            }
        }
        return $cartInsertDeleteResult;
    }

    function OrderListByUser(Request $request){
        $email=  $request->email;
        $result=Order::Where('email',$email)->orderBy('id', 'DESC')->get();
        return $result;
    }

}
