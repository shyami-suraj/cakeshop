<?php
//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\SliderService;

class SliderController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new SliderService();
    }

    function index(Request $request){

        $products = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $products]);
    }
}
