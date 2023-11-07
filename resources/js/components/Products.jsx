//components- products.jsx
import styled from "styled-components"

import Product from "./Product";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;

`;
const Title = styled.h1`

background-color: var(--lightpink);
height: 50px;
color: #de5a70;
text-align: center;
padding-top: 5px;
padding-bottom: 5px;

margin-top: 40px;
font-size: 40px;
`;

const Button=styled.button`
    background-color: var(--mainColor);
    margin-left:48%;
    color:white;
    height: 50px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    /* border-radius: 10px; */
`;


const Products = () => {

//     let navigate=useNavigate()
//   const routeProducts = () => {
//       let path = `/@/products/${item.slug}`;
//       navigate(path);
//     }



                            //for fetching data from database 
                                        // {start}


    const [products, setProducts] = useState([]);
    const fetchUserData = () => {

// fetching data from db through api
        fetch("http://127.0.0.1:8000/api/featured_product")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("fetch featured data:", data);

                if (data.status == "success") {
                    setProducts(data.data);
                    console.log("fetch featured data:", data.data);
                }
                else {
                    "Error on data fetching."
                }

            })
    }
    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();


        console.log('My wishlist', localStorage.getItem("wishlistId"));

    },
        []);

                                     // {end}




        let navigate=useNavigate()
        const routeProducts = () => {
            let path = `/@/productlist/`;
            navigate(path);
          }


    return (
        <>
            <Title>Our Cakes</Title>

            {products &&
                <Container>
                    {/* displaying db data in loop using map */}
                    {products.map((item) => (
                        <Product item={item} key={item.id} />

                    ))}
                </Container>
               
            }
             <Button onClick={routeProducts}>VIEW MORE</Button>
        </>

    )
}


export default Products
