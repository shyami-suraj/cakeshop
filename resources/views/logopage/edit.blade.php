@extends('adminlte::page')
@section('content')
<div class= "container"  >

    <h1 class= "head" > Edit Logo Page </h1>

    <form action="{{ route('admin.logopage.store') }}" method="POST" enctype="multipart/form-data" >
        @csrf
        <input type="hidden" name="id" value="{{$logopage->id}}"/>

        <table class="e-table" >
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr >
                <td >Title:</td>
                <td><input class="e-input" type="text" name="title" value="{{ $logopage['title'] }}" ></td>
            </tr>
             <tr>
                <td>Upload Image:</td>

                <td><input class="file-upload-input" type="file" name ="image" ></td>
            </tr>
            <tr>
                <td></td>
                <td><img src="{{ url("images/". $logopage->image) }}" style="height:60px;width:60px" alt="logo"></td>

            </tr>


        </table>
        <button class="e-button"type="submit" value="" > Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">


@stop
