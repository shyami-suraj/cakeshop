<?php
//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\ProductService;
use App\Models\Product;
use App\Models\CategoryProduct;

class ProductController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new ProductService();
    }

    function index(Request $request){

        $products = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $products]);
    }

    function show($id){
        $product = Product::find($id);
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $product]);


    }

    function product_detail($slug){
        $product = Product::where('slug', $slug)->first();
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $product]);


    }
    function featured_product(Request $request){
        $products = $this->service->featured_product();
// doesn't return view
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $products]);
    }


  


}
