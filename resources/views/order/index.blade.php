@extends('adminlte::page')

@section('content')

    @php
    $heads = [
        'S.N.',
        'order_id',
        'phone',
        'Date',
        'total',
        'view',
    ];


    @endphp



    {{-- Minimal example / fill data using the component slot --}}
<x-adminlte-datatable id="table1" :heads="$heads" theme="danger">
<h1 class="main-head">Order List</h1>

      @foreach ($order as $orders)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>#{{ $orders->id  }} {{$orders->name}}</td>
                <td>{{$orders->phone}}</td>
                <td>{{ $orders->created_at  }}</td>
                <td>Rs.{{ $orders->total  }}</td>
                <td>
                    <a class="btn btn-success" href="{{ route('admin.order.show', [$orders->id]) }} " > View</a>
                </td>





            </tr>
        @endforeach
    </x-adminlte-datatable>


@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">

@stop
