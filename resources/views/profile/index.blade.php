@extends('adminlte::page')
@section('content')
<h1> Edit Profile</h1>

<form action="{{ route('admin.profile.update', [$profile->id]) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <table>
        <tr>
            <td>Name:</td>
            <td><input type="text" name="name" value="{{$user->name}}"></td>
        </tr>
        <tr>
            <td>Address:</td>
            <td><input type="text" name="address" value="{{$user->address}}" ></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td><input type="number" name="phone" value="{{$user->phone}}"></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><input type="email" name="email" value="{{$user->email}}"></td>
        </tr>
        
        <tr>
            <td>Password</td>
            <td><input type="password" name="password" ></td>
        </tr>
        <tr>
        <td></td>
            @error('password')
            <td class="text-danger">{{ $message }}</td>
        @enderror
            
        </tr>
    </table>
    <button type ="submit"> Update</button>
</form>
@endsection