<?php
// 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\CategoryService;
use App\Models\CategoryProduct;
use App\Models\Product;

class CategoryController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new CategoryService();
    }

    function index(Request $request){
        
        $category = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $category]);
    }


    public function category_detail($id){
        $category = $this->service->category_detail($id);
     
        return response()->json(['status'=>'success','msg'=>'','data'=> $category]);

    }
}