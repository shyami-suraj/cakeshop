<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\OrderService;

class OrderController extends Controller
{
    public $service;
    public function __construct(){

       $this->service = new OrderService();
    }
    function index(Request $request){
        $order = $this->service->all();
        return view('order.index', compact('order'));
    }
    function show(Request $request , $id){
        $order = $this->service->show($id);
        $orderdetails=$order['order'];
        $orderitems=$order['orderitem'];

        // dd($order['order']);
        // die();
        return view('order.show', compact('orderitems','orderdetails'));

    }


}
