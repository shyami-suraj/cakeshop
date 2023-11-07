@extends('adminlte::page')

@section('content')
    <div class="O-container">
        <div class="O-left">

            <table class="O-table">
                <tr>
                    <td class="O-td">User id:</td>
                    <td>{{ $orderdetails->user_id }}</td>
                </tr>
                <tr>
                    <td class="O-td">Client name : </td>
                    <td>{{ $orderdetails->name }} </td>
                </tr>
                <tr>
                    <td class="O-td"> phone : </td>
                    <td>{{ $orderdetails->phone }} </td>
                </tr>
                <tr>
                    <td class="O-td">email : </td>
                    <td>{{ $orderdetails->email }} </td>
                </tr>
            </table>
        </div>
        <div class="O-right">

            <table class="O-table">
                <tr>
                    <td class="O-td">Order date:</td>
                    <td>{{ $orderdetails->created_at }}</td>
                </tr>
                <tr>
                    <td class="O-td">Shipping address : </td>
                    <td>{{ $orderdetails->shipping_address }} </td>
                </tr>
                <tr>
                    <td class="O-td"> Shipping city : </td>
                    <td>{{ $orderdetails->shipping_city }} </td>
                </tr>
                <tr>
                    <td class="O-td">Payment method : </td>
                    <td>{{ $orderdetails->payment_mode }}</td>
                </tr>
            </table>

        </div>


    </div>

    @php
        $heads = ['S.N.', 'Product Name', 'image', 'item_id', 'textoncake', 'eggless', 'sugarless', 'qty', 'price'];

    @endphp
    {{-- Minimal example / fill data using the component slot --}}
    <h1 style="text-align: center;">Order List</h1>
    <x-adminlte-datatable id="table1" :heads="$heads" theme="danger">


        @foreach ($orderitems as $orderiteam)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $orderiteam->products->name }}</td>
                <td><img src="{{ url('images/' . $orderiteam->products->image) }}"style="height:60px;width:60px"></td>
                <td>#{{ $orderiteam->order_id }}</td>
                <td>{{ $orderiteam->textoncake }}</td>
                <td>{{ $orderiteam->eggless }}</td>
                <td>{{ $orderiteam->sugarless }}</td>
                <td>{{ $orderiteam->qty }}</td>
                <td>Rs.{{ $orderiteam->price }}</td>







            </tr>
        @endforeach
    </x-adminlte-datatable>

    <div class="O-container">
        <div class="O-left">
        </div>
        <div class="O-right" style="padding-right: 75px">
            <table class="O-table">
                <tr>
                    <td class="O-td"> Subtotal:</td>
                    <td>Rs.{{ $orderdetails->subtotal }}</td>
                </tr>
                <tr>
                    <td class="O-td"> Discount:</td>
                    <td>Rs.{{ $orderdetails->discount }}</td>
                </tr>
                <tr>
                    <td class="O-td"> Shipping charge:</td>
                    <td>Rs.{{ $orderdetails->shipping_charge }}</td>
                </tr>
                <tr>
                    <td class="O-td"> Total:</td>
                    <td>Rs.{{ $orderdetails->total }}</td>
                </tr>



        </div>
    </div>


@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">

@stop
