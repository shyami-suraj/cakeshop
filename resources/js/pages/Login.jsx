//login

import styled from "styled-components"
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


const Container=styled.div`
   width: 100vw;
   height: 80vh;
   background :
  url("https://img.freepik.com/free-photo/top-view-delicious-cake-arrangement_23-2148933608.jpg");
  background-repeat: no-repeat;
  background-size:100vw 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper=styled.div`
    width: 25%;
    padding: 20px;
    background-color: #fbf0f4;
    margin-bottom:20px;
    
`;
const Title=styled.h1`
   font-style: 24px;
   font-weight:600; 
   color:#EC407A;
`;
const Form=styled.div`
    display: flex;
   flex-direction: column;
    
`;
const Input=styled.input`
    flex: 1;
    min-width:40%;
    margin: 10px 0px;
    padding: 10px;
    font-weight: 500;
    color:#EC407A;
    border: 1px solid #EC407A ;

`;

const Button=styled.button`
    width: 30%;
    border: none;
    padding: 15px 20px;
    background-color:#EC407A; 
    color: white;
    cursor:pointer;
    margin-bottom:10px ;
`;
const Link=styled.a`
    margin: 5x 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    color:#EC407A;
    font-weight: 500;

`;
const Login = () => {
    let navigate=useNavigate()
        let path = `/`; 
   
    const [email,SetEmail] =React.useState();
    const [password,SetPassword] =React.useState();
    const [errorMsg, setErrorMsg] = useState('');

    console.log("localstorage:",localStorage.getItem("wishlistId"))




    // when we neeed to send data to db we use formBody while fetching

    const fetchUserData = () => {
      
      let dataToSend = {  email: email, password: password };
      // let dataToSend = JSON.stringify(dataToSends);
      console.log("data to send:", dataToSend);
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      console.log("form body:", formBody);

        
        fetch("http://127.0.0.1:8000/api/login", {

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
        if (responseJson.status == 'success') {
        //   // let arr=[{'email':email,'password':password}];
        //   // let jsonArray = JSON.stringify(arr);

        let user_wishlist = responseJson.user_wishlist;
        let wish = [];
        {user_wishlist && user_wishlist.map((resp,index)=>{
          wish.push(resp.id);
        })}

        const jsonArray = JSON.stringify(wish);
        localStorage.setItem("wishlistId", jsonArray)

         Swal.fire({
              title: "Success",
              text: "Login Successful",
              icon: "success",
              // confirmButtonText: "",
            });

           localStorage.setItem('token',responseJson.token);
          localStorage.setItem('user_id',responseJson.user_id);
         

          navigate(path);

        }
        else {
          setErrorMsg("Invalid email or password");
          console.log("user login failed")
        }
      });
          
      }



      React.useEffect(() => {
        // Update the document title using the browser API

          },
          []);

    const routeRegister = () => { 
        let path = `/@/register`; 
        navigate(path);
    }

    // for login authentication purpose
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
          SetEmail(value);
        }
        if (id === "password") {
            SetPassword(value);
          }
    }
 

  return (
    <>
    
    <Navbar/>
    <Container>
    <Wrapper>
<Form >

        <Title>SIGN IN</Title>
        <div style={{color:'red', textAlign:'center'}}>{errorMsg}</div>

        <Input type="email" placeholder="email" name="email" onChange={(e) => handleInputChange(e)} id="email" /> 

        <Input type="password" placeholder="password" name="password" onChange={(e) => handleInputChange(e)} id="password" />
        
{/* 
          > */}
           
            <Button onClick={()=>{fetchUserData()}}>LOGIN</Button>
            <Link>FORGET PASSWORD?</Link>
            <Link onClick={routeRegister}>CREATE A NEW ACCOUNT</Link>
    </Form>

    </Wrapper>
</Container>
<Footer/>
</>
  )

}
export default Login