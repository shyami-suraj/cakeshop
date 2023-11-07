@extends('adminlte::page')
@section('content')
<div style="background-color:white; margin:0px;  height:100vh; " >

    <h1 style="text-align: center;color:#ed1874;font-weight:bold; padding-top:20px;"> Edit Country </h1>

    <form action="{{ route('admin.country.store', [$country->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name='id' value="{{$id}}"/>
        <table style="color:#ed1874; font-size:24px; font-weight:bold; margin-top:30px; margin-left:25px;   ">
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Country Name:</td>
                <td><input type="text" name="country_name" value="{{ $country['country_name'] }}" style="border:none; background-color:#fea4c5; outline:none; border-radius:8px; margin:10px; color:#ed1874; padding-left:15px;"></td>
            </tr>
            
           

            
          
          

        </table>
        <button type="submit" value="" style="background-color: rgb(15, 174, 15); margin-left:25px; color:white; height:40px; width:65px; border-radius:8px; border:none; margin-top:10px; font-weight:bold;"> Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">

@stop
