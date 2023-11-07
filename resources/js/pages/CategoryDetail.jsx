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



const CategoryDetail = ({route}) => {
  let { slug } = useParams();

const [data, SetData] = useState('');

const location =useLocation();

console.log('location.search',location.search);
const id =new URLSearchParams(location.search).get('id'); //find alternate
console.log("Category id:",id);
console.log("route id:",slug);

const fetchUserData = () => {

                                      
    fetch("http://127.0.0.1:8000/api/category_detail/"+slug) //api path

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
    {data &&
      <Container>
          {data.map((item) => (
              <Product item={item} key={item.id} id={item.id} />

          ))}




      </Container>
  }
  <Footer/>
  </>
  )
}

export default CategoryDetail