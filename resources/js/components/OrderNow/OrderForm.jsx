import React, { useState } from 'react'
import './OrderForm.css'
// import { Token } from '@mui/icons-material';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";




const OrderForm = () => {
    const logindetail = localStorage.getItem('user_id');
    console.log('user_id:', logindetail)
    const Ordernow = localStorage.getItem("cart");
    var parsedObject = (Ordernow == '') ? [] : JSON.parse(Ordernow);
    console.log('ordernow:', Ordernow)
    parsedObject.forEach((item) => {
        console.log("sesson data", item)
    });


    const Orderprice = localStorage.getItem("totalprice");
    var orderObject = JSON.parse(Orderprice);
    console.log('Orderprice:', orderObject)

    const [full_name, SetFullName] = useState('');
    const [city, SetCity] = useState('');
    const [address, SetAddress] = useState('');
    const [phone, SetPhone] = useState('');
    const [email, SetEmail] = useState('');
    const [delivery_date, SetDelivery_date] = useState('');
    const [time_for_delivery, SetTime_for_delivery] = useState('');

    const place_order = () => {

        console.log('parsedobject', parsedObject);


        let data_to_send = { user_id: logindetail, name: full_name, city: city, address: address, phone: phone, email: email, delivery_date: delivery_date, time_for_delivery: time_for_delivery, sub_total: orderObject.sub_total, discount: orderObject.discount, totalcost: orderObject.totalcost, shipingcost: orderObject.shipingcost, parsedObject: parsedObject, orderObject: orderObject, payment_mode: "cashondelivery" }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_to_send)
        }
        console.log("request", requestOptions);
        fetch("http://127.0.0.1:8000/api/order", requestOptions)
            .then(response => {
                return response.json()

            })
            .then(data => {
                console.log("fetch featured data final:", data.msg);

                if (data.status == "success") {
                    window.location.reload(true);


                    console.log("fetch featured data final:", data.msg);
                }
                else {
                    "Error on data fetching."
                }

            })
    }







    const fetchUserData = () => {

        fetch("http://127.0.0.1:8000/api/profile/" + localStorage.getItem('user_id'))
            .then(response => {
                return response.json()
            })
            .then(data => {

                if (data.status == "success") {
                    //   setProfile(data.data);
                    console.log("detail:", data.data[0].email);


                    // for displaying user data in profile form
                    SetFullName(data.data[0].name);
                    SetPhone(data.data[0].phone);
                    //   SetCountry(data.data[0].country);
                    SetCity(data.data[0].city);
                    SetAddress(data.data[0].street_address);
                    SetEmail(data.data[0].email);




                    //   console.log("fetch data:",data.data[0].name);
                }
                else {
                    "Error on data fetching."
                }

            })
    }

    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();

    },
        []);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "deliverydate") {
            SetTime_for_delivery(value);
        }

    }
    // disable past dates
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    let navigate = useNavigate()
    const routecart = () => {
        let path = `/@/cart`;
        navigate(path);
    }

    return (
        <div className='MainContainer'>
            <div className="left">
                <h1>BILLING DETAILS</h1>
                <form id="checkout" className='OrderForm' method="post">
                    <input type="hidden" value={logindetail} />
                    <label>Full Name</label>
                    <input type='text' name="name" onChange={(item) => { SetFullName(item.target.value) }} value={full_name} className='Orderinput'></input>
                    <label>City</label>
                    <input type='text' name="shipping_city" onChange={(item) => { SetCity(item.target.value) }} value={city} className='Orderinput'></input>
                    <label>Street Address</label>
                    <input type='text' name="shipping_address" onChange={(item) => { SetAddress(item.target.value) }} value={address} className='Orderinput'></input>
                    <label>phone</label>
                    <input type='text' name="phone" onChange={(item) => { SetPhone(item.target.value) }} value={phone} className='Orderinput'></input>
                    <label>Email</label>
                    <input type='text' name="email" onChange={(item) => { SetEmail(item.target.value) }} value={email} className='Orderinput'></input>
                    <label>Delivery Date</label>
                    <DatePicker isValidDate={disablePastDt} dateFormat="YYYY-MM-DD" timeFormat={false}  onChange={(item) => { SetDelivery_date(item.format('YYYY-MM-DD')) }} name="delivery_date"  />
                    <label>Time Slot For Delivery Date</label>
                    <select onChange={(e) => handleInputChange(e)} id="deliverydate" className='Orderinput'>
                        <option></option>
                        <option>11:00AM-12:00Pm</option>
                        <option>12:00PM-1:00Pm</option>
                        <option>1:00PM-2:00Pm</option>
                        <option>2:00AM-3:00pm</option>
                    </select>
                    {/* <input type='date'   name="time_for_delivery" onChange={(item)=>{SetTime_for_delivery(item.target.value)}}  className='Orderinput'></input> */}

                </form>
            </div>
            <div className="right">
                <div className="Yourorder">

                    <table >
                        <div className="orderitem">
                            <h1>Your Order </h1>


                        </div>



                        <div className="orderitem">


                            <div className='itemspan'>
                                Product
                            </div>
                            <div className='itemspan'>
                                Price
                            </div>
                        </div>
                        <hr />

                        {parsedObject &&


                            <div >  {parsedObject.map((item, index) => (
                                <>
                                    <div className="orderitem">
                                        <div className='itemspan'>
                                            <span className="productname"> {item.name} x <span className='productquantity'>{item.quantity} </span> </span>
                                            <br />
                                            <table>
                                                <tr>
                                                    <td>  What to write on cake:</td>
                                                    <td> {item.textoncake}</td>
                                                </tr>
                                                {/* <tr>
                                            <td>Add image on cake:</td>
                                            <td> {item.pic == true ? "Yes" : "No"}</td>
                                        </tr> */}
                                                <tr>
                                                    <td>Sugarless:</td>
                                                    <td>  {item.sugarless == true ? "Yes" : "No"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Eggless:</td>
                                                    <td>{item.eggless == true ? "Yes" : "No"}</td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className='itemspan'>
                                            Rs.{item.price}
                                        </div>




                                    </div>
                                    <hr />
                                </>
                            ))}
                                <div className="orderitem">
                                    <table>
                                        <tr>
                                            <td>
                                                Payment method:
                                            </td>
                                            <td></td>
                                            <td>
                                                <input type="radio" value="cod" />Cash On Delivery
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                {orderObject &&

                                    <>
                                        <div className="orderitem">
                                            <div className='itemspan'>
                                                SubTotal
                                            </div>
                                            <div className='itemspan'>
                                                {orderObject.sub_total}
                                            </div>
                                        </div>

                                        <div className="orderitem">
                                            <div className='itemspan'>
                                                Discount
                                            </div>
                                            <div className='itemspan'>
                                                {orderObject.discount}                                            </div>
                                        </div>
                                        <div className="orderitem">
                                            <div className='itemspan'>
                                                Shiping Cost
                                            </div>
                                            <div className='itemspan'>
                                                {orderObject.shipingcost}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="orderitem">
                                            <div className='itemspan'>
                                                Total
                                            </div>
                                            <div className='itemspan'>
                                                {orderObject.totalcost}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="orderitem">
                                            <div className='itemspan'>

                                            </div>
                                            <div className='itemspan'>
                                                <button className='O-btn' onClick={() =>{
                    localStorage.setItem('cart', []);

                                                    place_order();
                                                    routecart();
                                                    Swal.fire({
                                                        title: "Success",
                                                        text: "Your Order Has Been Placed",
                                                        icon: "success",
                                                        confirmButtonText: "Yes",
                                                      }); }}> place order</button>
                                            </div>
                                        </div>


                                    </>




                                }
                            </div>

                        }
                    </table>
                </div>

            </div>
        </div>
    )
}

export default OrderForm
