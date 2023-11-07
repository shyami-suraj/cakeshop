@extends('adminlte::page')
@section('content')
<div class= "container"  >

    <h1 class= "head" > Edit slider </h1>

    <form action="{{ route('admin.slider.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$id}}"/>

        <table class="e-table" >
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$slider['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Slider Name:</td>
                <td><input class="e-input" type="text" name="name" value="{{ $slider['name'] }}" ></td>
            </tr>

            <tr>
                <td>Slider Detail:</td>
                <td><input class="e-input" type="text" name="detail" value="{{ $slider['detail'] }}" ></td>
            </tr>
            <tr>
                <td>Upload Image:</td>

                <td><input class="file-upload-input " type="file" name ="image" ></td>
            </tr>
            <tr>
                <td></td>
                <td><img src="{{ url("images/". $slider->image) }}"  style="height:60px;width:60px" alt="logo"></td>

            </tr>


        </table>
        <button type="submit" value="" class="e-button"> Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">

@stop
