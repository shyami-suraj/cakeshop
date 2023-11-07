<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('category', '\App\Http\Controllers\Api\CategoryController@index');
Route::get('location', '\App\Http\Controllers\Api\LocationController@index');
Route::get('products', '\App\Http\Controllers\Api\ProductController@index');
Route::get('product_detail/{id}', '\App\Http\Controllers\Api\ProductController@show');
Route::get('category_detail/{id}', '\App\Http\Controllers\Api\CategoryController@category_detail');
Route::get('product_detail/{id}', '\App\Http\Controllers\Api\ProductController@product_detail');
Route::get('slider', '\App\Http\Controllers\Api\SliderController@index');
Route::get('featured_product', '\App\Http\Controllers\Api\ProductController@featured_product');
Route::get('contactus', '\App\Http\Controllers\Api\ContactusController@index');
Route::get('logopage', '\App\Http\Controllers\Api\LogopageController@index');
Route::get('countrys', '\App\Http\Controllers\Api\CountryController@index');
Route::get('aboutus', '\App\Http\Controllers\Api\AboutusController@index');


Route::post('register','\App\Http\Controllers\Api\UserController@store');
Route::post('login','\App\Http\Controllers\Api\UserController@login');

// for profile
Route::get('profile/{id}','\App\Http\Controllers\Api\UserController@getProfile');
Route::post('update_profile/{id}','\App\Http\Controllers\Api\UserController@update');

Route::post('order', '\App\Http\Controllers\Api\OrderController@insert');
Route::get('ordershow/{id}', '\App\Http\Controllers\Api\OrderController@showMyorder');
Route::get('orderdetails/{id}', '\App\Http\Controllers\Api\OrderController@showorderdetail');

Route::get('wishlist/{id}', '\App\Http\Controllers\Api\WishListController@index');
Route::post('wishlist/store', '\App\Http\Controllers\Api\WishListController@store');
Route::post('wishlist/destroy/{id}', '\App\Http\Controllers\Api\WishListController@wishListDel');








