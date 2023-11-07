<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\LogopageService;
use App\Models\Logopage;


class LogopageController extends Controller
{
    //
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new LogopageService;
    }
    public function index(Request $request){

        $logopage =$this->service->all()->first();

        return view('logopage.edit',compact('logopage'));
    }
    public function store(Request $request){
                            // db ko id
        $id= $request->input('id');
        $addlogopage=$this->service->update($request,$id);
        return redirect()->route('admin.logopage.index');

    }

    function edit($id){
        $logopage=Logopage::All();
        return view('Logopage.edit',compact('logopage'));
    }


}
