<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contactus;
use App\Http\Services\ContactusService;

class ContactusController extends Controller
{
    public $service;
    public function __construct(){

       $this->service = new ContactusService;
    }
    function index(Request $request){
        $contactus = $this->service->all()->first();


        return view('contactus.edit', compact('contactus'));
    }

    public function store(Request $request){

        $id = $request->input('id');


            $addcontactus = $this->service->update($request,$id);


        return redirect()->route('admin.contactus.index');
    }
    public function edit($id)
    {
        $contactus = Contactus::All();
      return view('Contactus.edit',compact( 'contactus'));
    }

}
