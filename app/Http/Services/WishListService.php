<?php




namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\UserWishlist;


class WishListService
{                  //index
    public function all($id){
        $wishlist=UserWishlist::join('products','user_wishlists.product_id', '=','products.id')
        ->where ('user_id',$id)
        ->select('products.*')
        ->get();
        
        return  $wishlist ;
        
    } 
    // store
    public function insert(Request $request)
    {
       

        $wish = new UserWishlist();

        $wish->user_id = $request->input('user_id');  
        $wish->product_id = $request->input('product_id');
       
        $wish->save();


        return $wish;


        
    }
    public function wishListDel($id,Request $request){

        // $user_id = $request->input('id');  
        $product_id = $request->input('item_id');
        $wish=UserWishlist::where('user_id',$id)->where('product_id',$product_id)->delete();

        // $id= $request->user_id;
        // $item_id= $request->item_id;

        return $wish;

    }
}
