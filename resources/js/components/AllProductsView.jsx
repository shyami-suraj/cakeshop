import styled from "styled-components"

import Product from "./Product";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
padding-top: 15px;
margin-top: 40px;
`;




const AllProductsView = () => {

//     let navigate=useNavigate()
//   const routeProducts = () => {
//       let path = `/@/products/${item.slug}`;
//       navigate(path);
//     }


    const [products, setProducts] = useState([]);

    const fetchUserData = () => {


        fetch("http://127.0.0.1:8000/api/products")
            .then(response => {
                return response.json()
            })
            .then(data => {
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

    },
        []);

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
                    {products.map((item) => (
                        <Product item={item} key={item.id} />

                    ))}
                </Container>
               
            }
        </>

    )
}


export default AllProductsView
