<?php
// 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\LocationService;
use Illuminate\Http\Request;



class LocationController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new LocationService();
    }

    function index(Request $request){
        
        $location = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $location]);
    }
}