<?php

namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\CategoryProduct;

class ProductService
{

    public function all()
    {
        $product = Product::all();
        // $query = Product::query();
        return $product;
    }
    public function featured_product()
    {
        $product = Product::where('featured', '1')->select('products.*')->get();

        // $query = Product::query();
        return $product;
    }
    public function getItem($id)
    {
        $product = Product::where('id', $id)->first();
        return $product;
    }
    public function insert(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'slug' => 'required',
        //     'detail' => 'required',
        //     'price' => 'required',
        //     'weight' => 'required',
        //     'featured' => 'required',
        //     'images' => 'required',

        //      // means the phone field should be unique in the users table.
        // ]);

        $product = new Product();

        $product->name = $request->input('name');
        $product->slug = $request->input('slug');
        $product->detail = $request->input('detail');
        $product->price = $request->input('price');
        $product->weight = $request->input('weight');
        $product->featured = ($request->input('featured') == 'on') ? 1 : 0;
        $imageName = time() . '.' . $request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $product->image = $imageName;
        $product->save();

        $product_id = $product->id;
        if (!empty($request->category)) {
            foreach ($request->category as $cat) {
                $product_cat = new CategoryProduct();
                $product_cat->product_id = $product_id;
                $product_cat->category_id = $cat;
                $product_cat->save();
            }
        }
        try {


            return ['status' => 'success', 'msg' => ''];
        } catch (\Exception $e) {
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }
    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();

        if (!empty($request->input('name'))) {
            $name = $request->input('name');
            $product->name = $name;
        }
        if (!empty($request->input('slug'))) {
            $slug = $request->input('slug');
            $product->slug = $slug;

            if (!empty($request->input('detail'))) {
                $detail = $request->input('detail');
                $product->detail = $detail;
            }
            if (!empty($request->input('price'))) {
                $price = $request->input('price');
                $product->price = $price;
            }
            if (!empty($request->input('weight'))) {
                $weight = $request->input('weight');
                $product->weight = $weight;
            }

            if (!empty($request->input('featured'))) {
                // $featured =  $request->input('featured');
        $product->featured = ($request->input('featured') == '') ? 0 : 1;

                $product->featured = $featured;

            }
            if (!empty($request->image)) {

                $imageName = time() . '.' . $request->image->extension();

                $request->image->move(public_path('images'), $imageName);

                $product->image = $imageName;
            }
        }
        // echo $featured; die();
        $product->save();
        $category_products = CategoryProduct::where('product_id', $id)->get();

        foreach ($category_products as $ca) {
            $ca->delete();
        }
        if (!empty($request->category)) {

            foreach ($request->category as $cat) {

                $product_cat = new CategoryProduct();
                $product_cat->product_id = $id;
                $product_cat->category_id = $cat;
                $product_cat->save();
            }
        }

        try {



            return ['status' => 'success', 'msg' => ''];
        } catch (\Exception $e) {
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }
    public function delete($id)
    {
        $product = Product::where('id', $id)->first();
        CategoryProduct::where('product_id',$id)->delete();
        $product->delete();
        return ['status' => 'success', 'msg' => ''];
    }
}
