<?php
//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\LogopageService;

class LogopageController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new LogopageService();
    }



    function index(Request $request){

        $logopage = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $logopage]);
    }


}
