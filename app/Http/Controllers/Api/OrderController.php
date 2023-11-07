<?php
//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Services\OrderService;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new OrderService();
    }



    function index(){

        $aboutus = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $aboutus]);
    }
    function show($id){

        $order = $this->service->show($id);
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $order]);
    }

    function showMyorder($id){

        $order = Order::where('user_id',$id)->get();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $order]);
    }


    function showorderdetail($id){
                    // 'id'=db ko column ko id
        $order = Order::where('id',$id)->get();
        //$orderitem = OrderItem::where('order_id', $id)->get();

        $orderitem = OrderItem::join('products', 'order_items.item_id', '=', 'products.id')
                        ->where('order_id', $id)
                        ->select('order_items.*','products.name','products.image')
                        ->get();


// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','order'=> $order,'order_detail'=> $orderitem] );
    }

    public function insert(Request $request){

        $order = new Order();
        $order->user_id = $request->input('user_id');
        $order->shipping_charge=$request->input('shipingcost');
        $order->shipping_address=$request->input('address');
        $order->shipping_city=$request->input('city');
        $order->delivery_date=$request->input('delivery_date');
        $order->time_for_delivery=$request->input('time_for_delivery');
        $order->payment_mode=$request->input('payment_mode');
        $order->subtotal=$request->input('sub_total');
        $order->discount=$request->input('discount');
        $order->total=$request->input('totalcost');
        $order->name=$request->input('name');
        $order->phone=$request->input('phone');
        $order->email=$request->input('email');
        $order->save();



        $items = $request->parsedObject;
        foreach($items as $item){
            $orderitem = new OrderItem();
            $orderitem->order_id=$order->id;
            $orderitem->item_id=$item['id'];
            $orderitem->textoncake=$item['textoncake'];
            $orderitem->eggless=$item['eggless'];
            $orderitem->sugarless=$item['sugarless'];
            $orderitem->qty=$item['quantity'];
            $orderitem->price=$item['price'];
            $orderitem->save();
        }








        return ['status' => 'success', 'msg' => $items
    ];


    }



}
