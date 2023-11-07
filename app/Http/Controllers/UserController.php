<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\UserService;
use App\Models\User;

class UserController extends Controller
{
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new UserService();
    }

    function index(Request $request){
//      all db data are stored       service/fuc name = all
        $user = $this->service->all();
        $user = User::where('user_type','!=','A')->get();

        return view('users.index', compact('user'));
    }
    public function create()
    {
        return view('users.create');

    }
    public function store(Request $request){
        $id = $request->input('id');
        // dd($request->all());
        // die();
        if(empty($id)){
            $adduser = $this->service->insert($request);
        }
        else{
            $adduser = $this->service->update($request,$id);
        }

        return redirect()->route('admin.users.index');
    }
    public function edit($id)
    {
        $user =  User::find($id);

        return view('users.edit',compact('id', 'user'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.users.index');
    }
}
