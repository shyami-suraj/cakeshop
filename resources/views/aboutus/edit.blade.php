@extends('adminlte::page')
@section('content')
<div class= "container"  >

    <h1 class= "head" > Edit About Us </h1>

    <form action="{{ route('admin.aboutus.store') }}" method="POST" enctype="multipart/form-data" style="background-color: #fed7e5; height:60vh; width:70%; margin:auto">
        @csrf
        <input type="hidden" name="id" value="{{$aboutus->id}}"/>
    
        <table class="e-table" >
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr >
                <td >Title:</td>
                <td><input class="input" type="text" name="title" value="{{ $aboutus['title'] }}" style="border:none; background-color:#fea4c5; outline:none; border-radius:8px;  color:#ed1874; padding-left:15px; margin:10px"></td>
            </tr>

            <tr>
                <td>Description:</td>
                <td><textarea  name="desc" cols="50" rows="4" style="border:none; background-color:#fea4c5; outline:none; border-radius:8px; margin:10px; color:#ed1874; padding-left:15px;">{{ $aboutus['desc'] }}</textarea></td>
            </tr>

            
            
            <tr>
                <td>Upload Image:</td>

                <td><input class="file-upload-input" type="file" name ="image" style="color:#ed1874; margin:10px; " ></td>
            </tr>
            <tr>
                <td></td>
                <td><img src="{{ url("images/". $aboutus->image) }}"  style="height:60px;width:60px" alt="logo"></td>

            </tr>


        </table>
        <button type="submit" value="" style="background-color: rgb(15, 174, 15); margin-left:25px; color:white; height:40px; width:65px; border-radius:8px; border:none; margin-top:10px; font-weight:bold;"> Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">


@stop
