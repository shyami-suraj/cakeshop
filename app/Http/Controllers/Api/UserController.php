<?php
// 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UserService;
use App\Http\Services\WishListService;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Unique;

class UserController extends Controller


{
    public $service, $wishlist_service;
    public function __construct(){
        $this->service = new UserService();
        $this->wishlist_service = new WishListService();
    }

    function index(Request $request){
        
        $user = $this->service->all();
// doesn't return view
        return response()->json(['status'=>'success','msg'=>'','data'=> $user]);
    }


                // for register

    public function store(Request $request)
    {
         $request->validate([
            'phone' => 'required|unique:users',
            'email' => 'required|unique:users'
             // means the phone field should be unique in the users table.
        ]);


        $user = new User();

        
        $user->name = $request->input('name');  
        $user->phone = $request->input('phone');
        $user->country = $request->input('country');   
        $user->city = $request->input('city');   
        $user->street_address = $request->input('street');   
        $user->email = $request->input('email');   
        $user->user_type = $request->input('user_type');
        $user->password= bcrypt($request->input('password'));   
        $user->save();


            return response()->json([
                'status' => 'success',
                'message' => 'User Created Successfully',
               
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

       // return response()->json(['status'=>'success','msg'=>'','data'=> $user]);
        
    }


                    // for login
    public function login(Request $request){
        if(!Auth::attempt($request->only(['email', 'password']))){
            return response()->json([
                'status' => 'false',
                'message' => 'Email & Password does not match with our record.',
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        $user->remember_token=$user->createToken("API TOKEN")->plainTextToken;
        $user->save();

        $user_wishlist = $this->wishlist_service->all($user->id);
        return response()->json([
            'status' => 'success',
            'message' => 'User Logged In Successfully',
            'token' =>  $user->remember_token,
            'user_id'=>$user->id,
            'user_wishlist' => $user_wishlist
        ], 200);
    }

                    // for profile
    public function getProfile(Request $request,$id){
        $user= User::where('id',$id)->get();
    return response()->json(['status'=>'success','msg'=>'','data'=> $user]);
    }
    

    public function update(Request $request, $id){

        $user = User::where('id', $id)->first();

        if(!empty($request->input('name'))){
            $name = $request->input('name');
            $user->name = $name;
        }
            if(!empty($request->input('phone'))){
                $phone=$request->input('phone');
                $user->phone=$phone;
            }
            if(!empty($request->input('country'))){
                $country=$request->input('country');
                $user->country=$country;
            }
            if(!empty($request->input('city'))){
                $city=$request->input('city');
                $user->city=$city;
            }
            if(!empty($request->input('street'))){
                $street=$request->input('street');
                $user->street_address=$street;
            }

            if(!empty($request->input('email'))){
                $email=$request->input('email');
                $user->email=$email;
            }
            if(!empty($request->input('password'))) {
                if(!Hash::check($request['old_password'], $user->password)){
                    return response()->json(['status' => 'error' ,'old_pass'=>Auth::user()->password,'entered pass'=>bcrypt($request->input('old_password'))]);
                
                }  
             
                 
                else{
                    $password=$request->input('password');
                    $user->password=bcrypt($password);

                }

                
              
                
            }
            $user->save();

    return response()->json(['status'=>'success','msg'=>'','data'=> $user]);
            
        
 
     }



                    // for password
    public function pswdValidation(Request $request,$id){
        $user=User::where('id',$id)->get();
        

    

    return response()->json(['status'=>'success','msg'=>'','data'=> $user]);


    }
}