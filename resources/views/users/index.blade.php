@extends('adminlte::page')
@section('content')

@php

$heads = ['S.N', 'Name', 'Phone', 'Email',  ['label' => 'Actions ', 'no-export' => true, 'width' => 15]];

@endphp

{{-- for alert display while deleting --}}
@if(session()->get('success'))
<div class="alert alert-success">
{{ session()->get('success') }}
</div>
@endif
@if(session()->get('danger'))
<div class="alert alert-danger">
{{ session()->get('danger') }}
</div>
@endif

<div class="main-container" >

    <h1 class="main-heading" >Users List</h1>

    <x-adminlte-datatable id="table1" :heads="$heads" theme="danger">
        @foreach ($user as $userlist)
        <tr class="main-row">
            {{-- to display serial number --}}
            <td>{{ $loop->iteration }}</td>
            <td>{{ $userlist->name }}</td>
            <td>{{ $userlist->phone }}</td>
            <td>{{ $userlist->email }}</td>

            <td class="d-flex">
                <span class="action-btn">

                    <a style="font-size:16px " href="{{ route('admin.users.edit', [$userlist->id]) }}"
                        class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                        <i class="fa fa-lg fa-fw fa-pen"></i> </a>
                </span>



                <form action="{{ route('admin.users.destroy', [$userlist->id]) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button style="font-size:16px" type="submit"
                        class="btn btn-xs btn-default text-danger mx-1 shadow" onclick="return confirm('Are you sure you want to delete this item?')"> <i class="fa fa-lg fa-fw fa-trash"></i>
                    </button>
                </form>


            </td>



        </tr>
    @endforeach





    </x-adminlte-datatable>



@endsection
@section('css')
    <link rel="stylesheet" href="{{url('/css/style.css')}}">

@stop

