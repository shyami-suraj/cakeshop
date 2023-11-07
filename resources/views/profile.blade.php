@extends('adminlte::page')
@section('content')
<div class="c-container">

    <h1 class="heading"> Edit Profile </h1>

    <form action="{{route('admin.profile.update',auth()->id())}}" method="POST" enctype="multipart/form-data">
        @csrf
        <table class="c-form">
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Name:</td>
                <td><input type="text" class="input" name="name" value="{{auth()->user()->name}}"></td>
            </tr>

            <tr>
                <td>Phone:</td>
                <td><input type="text" class="input" name="phone" value="{{auth()->user()->phone}}" ></td>
            </tr>

            <tr>
                <td>Email:</td>
                <td><input type="text" class="input" name="email" value="{{auth()->user()->email}}"></td>
            </tr>
{{--
            <tr>
                <td>Password:</td>
                <td><input type="text" name="password" ></td>
            </tr> --}}




        </table>
        <button type="submit" class="button" value=""> Update</button>
        {{-- </form> --}}
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/createStyle.css') }}">

@stop
