<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutusController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ContactusController;
use App\Http\Controllers\LogopageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;




use Illuminate\Support\Facades\Auth;







/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can 6 web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/@/{name}', function () {
    return view('welcome');
});

Route::get('/@/{product}/{slug}', function () {
    return view('welcome');
});


Route::get('/logout', [LoginController::class, 'logout']);

// Route::group(['as'=>'admin.', 'prefix' => 'admin', 'namespace'=>'', 'middleware' => ['auth','admin']], function(){



//     // Route::get('category', [CategoryController::class, 'index'])->name('category/index');
//     // Route::get('category/create', [CategoryController::class, 'create'])->name('category/index');
//     // Route::get('category/{id}/edit', [CategoryController::class, 'edit'])->name('category/index');
//     // Route::post('category', [CategoryController::class, 'store'])->name('category/index');
//     // Route::delete('category/{id}', [CategoryController::class, 'index'])->name('category/index');


// });
Route::group(['as'=>'admin.', 'prefix' => 'admin', 'namespace'=>'', 'middleware' => ['auth','admin']], function(){

    Route::resource('products', ProductController::class);
    Route::resource('location', LocationController::class);
    Route::resource('country', CountryController::class);
    Route::resource('aboutus', AboutusController::class);
    Route::resource('slider', SliderController::class);
    Route::resource('contactus', ContactusController::class);
    Route::resource('logopage', logopageController::class);
    Route::resource('users', UserController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('order', OrderController::class);
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
    Route::post('profile/{user}', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::get('change-password', [App\Http\Controllers\HomeController::class, 'changePassword'])->name('change-password');
    Route::post('change-password', [App\Http\Controllers\HomeController::class, 'updatePassword'])->name('update-password');
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');




});




Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
