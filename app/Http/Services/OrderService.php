<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;


class OrderService{

    public function all(){
        $order = Order::all();
        return $order;
    }
   public function show($id){
        $order = Order::find($id);
        $orderitem = OrderItem::where('order_id', $id)->get();

        // return view('order.show', compact('order','orderitems'));
        // return $order;
        return ['orderitem' => $orderitem, 'order' => $order];
    }

















}
