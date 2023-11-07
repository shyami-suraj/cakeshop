import React,{useState} from 'react';
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Product from '../components/Product';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Footer from '../components/Footer';



const Container = styled.div`
background-color: #fbf0f4;
padding:20px;
display:flex;
flex-wrap:wrap;
height: 100vh;
`;

const Msg = styled.div`
color: red;
font-weight: bold;
font-size:35px;
height: 100vh;
margin: auto;
padding: 50px;
`;



const Wishlist = ({route}) => {

const [data, SetData] = useState('');

let w = localStorage.getItem("wishlistId")
  if (w == undefined || w == '') w = [];
  else  w = JSON.parse( w)
  
const [wish, SetWish] = useState(w);

const [bgColor,setBgColor] = useState("red")

const user_id=localStorage.getItem('user_id')
console.log(user_id)
const fetchUserData = () => {

  
                                      
    fetch("http://127.0.0.1:8000/api/wishlist/"+user_id) //api path

        .then(response => {
            return response.json()

        })
        .then(response_data => {
          console.log("category dataa:", response_data);

            if (response_data.status == "success") {
                SetData(response_data.data);

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






  return (
    <>
    <Navbar/>
    {user_id == null 
    ?
      <Container>
        <Msg>Please login to add to Wishlist.</Msg>
      


      </Container>
:
<Container>
      
{data && data.map((item) => (
              wish.includes(item.id) &&
              <Product item={item} key={item.id} id={item.id} />

          ))}

      </Container>
    }
  
  <Footer/>
  </>
  )
}

export default Wishlist