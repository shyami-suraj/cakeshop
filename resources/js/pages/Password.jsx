import React from 'react'
import "./Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Password = () => {

  let navigate = useNavigate();
  let path = `/`;

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [opassword, setOpassword] = useState('');


  // for error message display

  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');
  const [opasswordError, setOpasswordError] = useState('');


  console.log("id:", localStorage.getItem('user_id'))


  const fetchUserData = () => {

    fetch("http://127.0.0.1:8000/api/profile/" + localStorage.getItem('user_id'))
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("detail:", data);

        if (data.status == 'success') {
          //   setProfile(data.data);




          setPassword(data.data[0].password)
          console.log("Password: ", data)
          setCpassword(data.data[0].cpassword)



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



  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "pwd") {
      setPassword(value);
    }
    if (id === "cpwd") {
      setCpassword(value);
    }
    if (id === "opwd") {
      setOpassword(value);
    }

  }

  const handleSubmit = () => {

    //   form validation
    var isFormValid = true;

    if (password == '' || password == null) {
      setPasswordError('Please enter your password');
      isFormValid = false
    }
    else if (!password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
      setPasswordError('Password must contain at least one lowercase alphabet & at least one upercase alphabet & at least one number');
      isFormValid = false
    }
    else if (password.length < 8) {
      setPasswordError('Password must be at least 8 character long');
      isFormValid = false
    }
    else {
      setPasswordError("")
    }

    //  for cpwd
    if (cpassword == '' || cpassword == null) {
      setCpasswordError('Please enter your confirm password');
      isFormValid = false
    }
    else if (password != cpassword) {
      setCpasswordError('Password did not match');
      isFormValid = false
    }

    else {
      setCpasswordError("")
    }

    let dataToSend = { password: password, old_password: opassword };
    console.log("data to send:", dataToSend);
    console.log("Form validate:");

    if (isFormValid == true) {
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
            console.log("responseSuccess ", responseJson);


            navigate(path);

          }
          else {
            console.log("user registration failed")
          }
          if (responseJson.status == "error") {
            setOpasswordError('Incorrect old password');

          }
        });
    }


  }





  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="pro-form">
          <table className='pro-table'>
            <h1 className='pro-head'>Change Password</h1>

            <label className='pro-l'>Old Password</label>
            <br />
            <input type="password" className='pro-input' name="opwd" id="opwd" onChange={(e) => handleInputChange(e)} placeholder='enter old password' />
            <div style={{ color: 'red', paddingLeft: 20 }}>{opasswordError}</div>



            <label className='pro-l'> New Password</label>
            <br />
            <input type="password" className='pro-input' name="pwd" onChange={(e) => handleInputChange(e)} id="pwd" placeholder='enter new password' />
            <div style={{ color: 'red', paddingLeft: 20 }}>{passwordError}</div>


            <label className='pro-l'>Confirm Password</label>
            <br />
            <input type="password" className='pro-input' name="cpwd" id="cpwd" onChange={(e) => handleInputChange(e)} placeholder='confirm password' />
            <div style={{ color: 'red', paddingLeft: 20 }}>{cpasswordError}</div>



            <button className="pro-button" onClick={() => { handleSubmit() }}>Update</button>
          </table>
        </div>
      </div>

      <Footer />






    </>
  )
}

export default Password