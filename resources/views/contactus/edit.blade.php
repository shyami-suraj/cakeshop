@extends('adminlte::page')
@section('content')
<div class="c-container">

    <h1 class= "head"> Edit Contact us </h1>

    <form action="{{ route('admin.contactus.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$contactus->id}}" />
        <table class="e-table" >
           <tr>
                <td>map:</td>
                <td><textarea name="map" class="e-input"  cols="50" rows="4">{{$contactus->map}}</textarea></td>
            </tr>

            <tr>
                <td>address:</td>
                <td><input type="text" class="e-input" name="address" value="{{$contactus->address}}" ></td>
            </tr>

            <tr>
                <td>mail:</td>
                <td><input type="text" class="e-input" name="mail" value="{{$contactus->mail}}"></td>
            </tr>
            <tr>
                <td>phone:</td>
                <td><input type="text" class="e-input" name="phone" value="{{$contactus->phone}}"></td>
            </tr>
            <tr>
                <td>date:</td>
                <td><input type="text" class="e-input" name="date" value="{{$contactus->date}}"></td>
            </tr>
{{--
            <tr>
                <td>Password:</td>
                <td><input type="text" name="password" ></td>
            </tr> --}}




        </table>
        <button type="submit" class="e-button" value=""> Update</button>
        {{-- </form> --}}
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">

@stop
