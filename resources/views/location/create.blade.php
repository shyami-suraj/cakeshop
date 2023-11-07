@extends('adminlte::page')
@section('content')
<div style="background-color:white; margin:0px;  height:100vh; " >
<h1 style="text-align: center;color:#ed1874;font-weight:bold; padding-top:20px;"> Add Location </h1>

<form action="{{ route('admin.location.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <table class="c-form" style="color:#ed1874; font-size:24px; font-weight:bold; margin-top:30px; margin-left:25px;   ">
        <tr>
            <td>Country:</td>
            <td >
            <select style="margin-left:10px; color:#ed1874; background-color:#fbe9f5; border:none; border-radius:8px;" name="country_id" required>
                <option value="">select</option>
                <?php

                // create func variable = $categories
               foreach ($countries as $country_id => $country) {
               ?>
                       <option value="{{ $country_id }}"> <?php echo $country; ?></option>
                       <?php } ?>
                   </select>
            </select>
            </td>
        </tr>

        <tr>
            <td>City:</td>
            <td><input type="text" name="city" style="border:none; background-color:#fbe9f5; outline:none; border-radius:8px; margin:10px;" required ></td>
        </tr>




    </table>
    <button type ="submit" style="background-color: rgb(15, 174, 15); margin-left:25px; color:white; height:40px; width:60px; border-radius:8px; border:none; margin-top:10px; font-weight:bold;" > Create</button>
</form>
</div>
@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/createStyle.css') }}">

@stop
