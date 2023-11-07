<?php
//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\ContactusService;

class ContactusController extends Controller
{
    public $service;
    public function __construct(){
        $this->service = new ContactusService();
    }

    function index(Request $request){

        $contactus = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success', 'msg'=>'', 'data' => $contactus]);
    }
}
