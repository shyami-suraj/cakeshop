<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Services\ProductService;

class ProductController extends Controller
{
    public $service;
    public function __construct(){

       $this->service = new ProductService();
    }
    function index(Request $request){
        $product = $this->service->all();

        return view('products.index', compact('product'));
    }
    public function create()
    {
        $categories = Category::All();
        return view('products.create',compact('categories'));
    }
    public function store(Request $request){

        $id = $request->input('id');

        if(empty($id)){

            $addproduct = $this->service->insert($request);
        }
        else{
            $addproduct = $this->service->update($request,$id);
        }

        return redirect()->route('admin.products.index');
    }
    public function edit($id)
    {
        $categories = Category::All();
        $product =  Product::find($id);
        // dd($product);
        // die();
        $selected_categories = $product->categories->pluck('id')->toArray();

        return view('products.edit',compact('product', 'categories', 'selected_categories'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.products.index');
    }
}
