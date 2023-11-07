import React from 'react'
import "./Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country,setCountry]=useState('');
  const [city,setCity]=useState('');
  const [street,setStreet]=useState('');

  const [email, setEmail] = useState('');




  const fetchUserData = () => {

    fetch("http://127.0.0.1:8000/api/profile/" + localStorage.getItem('user_id'))
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("detail:", data);

        if (data.status == 'success') {
          //   setProfile(data.data);


          // for displaying user data in profile form
          setName(data.data[0].name);
          setPhone(data.data[0].phone);
          setCountry(data.data[0].country);
          setCity(data.data[0].city);
          setStreet(data.data[0].street_address);
          setEmail(data.data[0].email);
          // setPassword(data.data[0].password)
          // console.log("Password: ", data)
          // setCpassword(data.data[0].cpassword)



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

  console.log("session data:", localStorage.getItem('user_id'))

  // for directing to another page
  let navigate = useNavigate();
  let path = `/`;

  const routePwd = () => {
    let path = `/@/password/`;
    navigate(path);
  }




  // when we display user info in their profile then we need to allow user to edit them too 
  // for that purpose we use handleInputChange function like below
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
    if (id === "country") {
      console.log("Value:",value);

      setCountry(value);
      
    }
    if (id === "city") {
      setCity(value);
    }
    if (id === "street") {
      setStreet(value);
    }
    if (id === "email") {
      setEmail(value);
    }


  }



  // for updating profile

  const updateProfile = () => {
    let dataToSend = { name: name, phone: phone, email: email,country:country,city:city,street:street };
    console.log("data to send:", dataToSend);
    console.log("Form validate:");

    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log("form body:", formBody)

    fetch("http://127.0.0.1:8000/api/update_profile/" + localStorage.getItem("user_id"), {

      method: 'POST',
      body: formBody,

      headers: {
        //Header Defination
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      // We convert the React state to JSON and send it as the POST body
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("response ", responseJson);
        // to redirect to home page after updating user profile
        if (responseJson.status == 'success') {


          navigate(path);

        }
        else {
          console.log("user registration failed")
        }
      });




    // e.preventDefault();


  };













  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="pro-form">
          <table className='pro-table'>
          <h1 className='pro-head'>My Profile</h1>

            <tr>
              <td>
                <label className='pro-l'>Full Name:</label>
                <br />                                                        {/* for allowing user to edit their data/info */}
                <input type="text" className='pro-input' name="name" id="name" value={name} onChange={(e) => handleInputChange(e)} />
              </td>
              <td>

                <label className='pro-l'> Phone:</label>
                <br />
                <input type="phone" className='pro-input' name="phone" id="phone" value={phone} onChange={(e) => handleInputChange(e)} />
              </td>
            </tr>

            <tr>
              <td>
                <label className='pro-l'>Email:</label>
                <br />
                <input type="email" className='pro-input' name="email" id="email" value={email} onChange={(e) => handleInputChange(e)} />
              </td>


              <td>
                <label className='pro-l'>Country:</label>
                <br />
                <select name="country" className='pro-select' id="country" onChange={(e) => handleInputChange(e)}>
                    <option value={country}>{country}</option>
                 
                  </select>
              </td>

              
            </tr>

           

            <tr>
              <td>
                <label className='pro-l'>City:</label>
                <br />
                <select name="city" className='pro-select'  id="city" onChange={(e) => handleInputChange(e)}>
                   
                <option value={city}>{city}</option>


                 
                  </select>
              </td>

              <td>
                <label className='pro-l'>Street Address</label>
                <br />
                <input type="text" className='pro-input' name="street"  id="street" value={street} onChange={(e) => handleInputChange(e)} />
              
               
             
              </td>
             
            </tr>




            {/* <button className="p-button" onClick={routePwd}>Change Password</button> */}

          </table>
          <button className="pro-button" onClick={() => { updateProfile() }}>Update</button>

          </div>
        </div>
      <Footer />






    </>
  )
}

export default Profile