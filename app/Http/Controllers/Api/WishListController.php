<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\WishListService;
use Illuminate\Http\Request;
use App\Models\UserWishlist;

class WishListController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new WishListService();
    }
    function index($id){
        
        $wish = $this->service->all($id);
        return response()->json(['status'=>'success','msg'=>'','data'=> $wish]);
        
    } 
    public function store(Request $request)
    {
       


        $wish = $this->service->insert($request);

        return response()->json(['status'=>'success','msg'=>'','data'=> $wish]);


        
    }
    public function wishListDel($id,Request $request){

      
        $wish = $this->service->wishListDel($id,$request);
        return response()->json(['status'=>'success','msg'=>"",'data'=> $wish]);

    }
}
