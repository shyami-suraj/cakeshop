<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\CategoryProduct;
use App\Models\Product;




class CategoryService{
                    // index
    public function all(){
        $category = Category::all();
        return $category;
    }
   

    public function getItem($id){
        $category = Category::where('id', $id)->first();
        return $category;
    }
                    // store
    public function insert(Request $request){
        $category = new Category();

        $category->name = $request->input('name');
        $category->slug = $request->input('slug');
        $category->parent_id = $request->input('parent_id');
        $imageName = time().'.'.$request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $category->image = $imageName;


        try
		{
            $category->save();
            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }

    public function update(Request $request, $id){

        $category = Category::where('id', $id)->first();

        if(!empty($request->input('name'))){
            $name = $request->input('name');
            $category->name = $name;
        }
        if(!empty($request->input('slug'))){
            $slug = $request->input('slug');
            $category->slug = $slug;

        // if(!empty($request->input('parent_id'))){
            $parent_id = $request->input('parent_id');
            $category->parent_id = $parent_id;

        if (!empty ($request->image)){

            $imageName = time().'.'.$request->image->extension();

            $request->image->move(public_path('images'), $imageName);

            $category->image = $imageName;

            }


        }

		try
		{
            $category->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }

    public function delete($id){
		$category = Category::where('id', $id)->first();
        $category->delete();
		return ['status' => 'success', 'msg' => ''];
    }
    // public function category($id){
    //     $category=Category::where
    // }

    public function category_detail($id){
        $category= CategoryProduct::join('categories', 'categories.id', '=', 'category_product.category_id')
            ->join('products','category_product.product_id', '=','products.id')
            ->where('categories.slug',$id)
            ->select('products.*')
            
            ->get();
        return $category;

    }

}
