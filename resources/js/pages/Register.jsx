//register.jsx
import React,{ useState } from "react";
import "./Register.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
  //   valueget  valueset in the register form ( user side)
  // name= also used while sending data to api controler
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  // for  displaying error message
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  //  to edit and set changed/edited data
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
    
    if (id === "pwd") {
      setPassword(value);
    }
    if (id === "cpwd") {
      setCPassword(value);
    }

  }

  // for redirecting to next page
  let navigate = useNavigate()
  let path = `/@/login`;




  const handleSubmit = () => {
    console.log("Phone", phone.length)
    // form validation

    var isFormValid = true;

    // for name
    if (name == '' || name == null) {
      setNameError('Please enter your name');
      isFormValid = false
    }
    else if (name.length < 3) {
      setNameError('Name must contain at least 3 characters');
      isFormValid = false
    }
    else {
      setNameError("")
    }

     // for street address
     if (street == '' || street == null) {
      setStreetError('Please enter street address');
      isFormValid = false
    }
    else if (street.length < 3) {
      setStreetError('Address must contain at least 3 characters');
      isFormValid = false
    }
    else {
      setStreetError("")
    }

    //  for phone
    if (phone == '' || phone == null) {
      setPhoneError('Please enter your phone');
      isFormValid = false
    }
    else if (phone.length != 10) {
      setPhoneError('Phone must contain 10 digits');
      isFormValid = false
    }
    else {
      setPhoneError("")
    }

    //  for email
    if (email == '' || email == null) {
      setEmailError('Please enter your email');
      isFormValid = false
    }
    else if (!email.match(/^[a-zA-Z][a-zA-Z_.0-9]*[@][a-zA-Z]+[.][a-zA-Z]+$/)) {
      setEmailError('Enter valid email format');
      isFormValid = false
    }
    else {
      setEmailError("")
    }


    // password = usestate ma use greko name hru, not of name in form
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



// sending data from frontend to api controller (mediater)

    // first name is the variable used in usercontroller as ($request->input('name'))
    // second name is the variable declared in above useState
    let dataToSend = { name: name, phone: phone, email: email, password: password, user_type: "user",country:country,city:city,street:street };
    console.log("country value:",country)
    console.log("data to send:", dataToSend);

    // after form is valid
    if (isFormValid) {
      console.log("Form validate:");

      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      console.log("form body:", formBody)

      fetch("http://127.0.0.1:8000/api/register", {

        method: 'POST',
        body: formBody,

        headers: {
          //Header Defination
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },

        // We convert the React state to JSON and send it as the POST body
        // storing response.json which is returned from api usercontroller in response parameter
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("response ", responseJson);
          if (responseJson.status == 'success') {
            //   // let arr=[{'email':email,'password':password}];
            //   // let jsonArray = JSON.stringify(arr);



            //  displaying successful message after successful registeration

            Swal.fire({
              title: "Success",
              text: "Successfully Registered",
              icon: "success",
              confirmButtonText: "Go to login",
            });

// for automatically displaying email & password of users in login form after they successfully registered
            // localStorage.setItem('email', email);
            // localStorage.setItem('password', password);

            navigate(path);


          }
          else {
            // Swal.fire({
            //   title: "Failed",
            //   text: responseJson.message,
            //   icon: "fail",
            //   // confirmButtonText: ''",


            // });

            // for displaying error message when phone and email are same
{responseJson.message =="The email has already been taken."?
setEmailError(responseJson.message):
responseJson.message=="The phone has already been taken. (and 1 more error)"?(
setEmailError("The Email has already been taken."),
 setPhoneError("The phone has already been taken."))

:
setPhoneError(responseJson.message);

}
            console.log("user registration failed")
          }
        });



      // e.preventDefault();
    }

  };

  // for country data fetching from db
const[countries,setCountries]=useState('');
  const fetchUserData = () => {


      fetch("http://127.0.0.1:8000/api/countrys")
          .then(response => {
              return response.json()
          })
          .then(data => {
              if (data.status == "success") {
                setCountries(data.data);
                  console.log("fetch Country data:", data.data);
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

       // for city data fetching from db
       const [cities, setCities] = useState('');

        const fetchUserData1 = () => {
     
     
           fetch("http://127.0.0.1:8000/api/location")
               .then(response => {
                   return response.json()
               })
               .then(data => {
                   if (data.status == "success") {
                     setCities(data.data);
                       console.log("fetch City data:", data.data);
                   }
                   else {
                     "Error on data fetching."
                   }
     
               })
       }
     
     
     
       React.useEffect(() => {
           // Update the document title using the browser API
           fetchUserData1();
     
       },
           []);






  return (
    <>
      <Navbar />
      <div className="r-container">
        <div className="regform">
          <h1 className="head">Register</h1>

          <label className="r-label">Name</label>
          <input className="reg-input" type="text" name="name" onChange={(e) => handleInputChange(e)} id="name" />
          <div style={{ color: 'red' }}>{nameError}</div>

          <label className="r-label"> Phone</label>
          <input type="phone" className="reg-input" name="phone" onChange={(e) => handleInputChange(e)} id="phone" />
          <div style={{ color: 'red' }}>{phoneError}</div>

          <label className="r-label"> Country</label>
          
          <select className="r-select"  name="country" id='country' onChange={(e) => handleInputChange(e)}>
          <option value='' >--select country--</option>

          {countries && countries.map((item) => (
              
              <option value={item.country_name}  >{item.country_name}</option>
              

            ))}
                    
                  </select>
          
          
          {/* <div style={{ color: 'red' }}>{countryError}</div> */}

          
          <label className="r-label"> City</label>

          <select className="r-select" name="city" id='city' onChange={(e) => handleInputChange(e)}>
          <option value='' >--select city--</option>

          {cities && cities.map((item) => (
              
              <option value={item.city}>{item.city}</option>
              

            ))}
                    
                  </select>
          
         
          {/* <div style={{ color: 'red' }}>{cityError}</div> */}

          <label className="r-label">Street Address</label>
          <input className="reg-input" type="text" name="street" onChange={(e) => handleInputChange(e)} id="street"  />
          <div style={{ color: 'red' }}>{streetError}</div>



          <label className="r-label">Email</label>
          <input type="email" className="reg-input" name="email" onChange={(e) => handleInputChange(e)} id="email" />
          <div style={{ color: 'red' }}>{emailError}</div>


          <label className="r-label"> Password</label>
          <input type="password" className="reg-input" name="pwd" onChange={(e) => handleInputChange(e)} id="pwd" />
          <div style={{ color: 'red' }}>{passwordError}</div>


          <label className="r-label">Confirm Password</label>
          <input type="password" className="reg-input" name="cpwd" onChange={(e) => handleInputChange(e)} id="cpwd" />
          <div style={{ color: 'red' }}>{cpasswordError}</div>



          <button className="r1-button" onClick={() => { handleSubmit() }}>Submit</button>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
