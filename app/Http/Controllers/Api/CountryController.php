<?php
// 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\CountryService;
use Illuminate\Http\Request;



class CountryController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new CountryService();
    }

    function index(Request $request){
        
        $country = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $country]);
    }
}