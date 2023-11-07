<?php
// 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\AboutusService;

class AboutusController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new AboutusService();
    }

  

    function index(Request $request){
        
        $aboutus = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $aboutus]);
    }


}