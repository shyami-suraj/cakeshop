@extends('adminlte::page')
@section('content')
<div class= "container"  >

    <h1 class= "head" > Edit Users </h1>

    <form action="{{ route('admin.users.store', [$user->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$id}}"/>
    
        <table class="e-table" >
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$user['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Name:</td>
                <td><input class="e-input"type="text" name="name" value="{{ $user['name'] }}" ></td>
            </tr>

            <tr>
                <td>Phone:</td>
                <td><input class="e-input" type="text" name="phone" value="{{ $user['phone'] }}" ></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><input class="e-input" type="email" name="email" value="{{ $user['email'] }}" ></td>
            </tr>

            <tr>
                <td>User Type:</td>
                <td>
                    <select name="user_type" class="e-input" id="user" >
                        <option value="{{ $user['user_type'] }}">{{$user['user_type']}}</option>
                        <option>admin</option>
                        <option>user</option>


                        
                   
                    </select>
                </td>
            </tr>
            

           
            


        </table>
        <button class="e-button" type="submit" value="" > Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">

@stop
