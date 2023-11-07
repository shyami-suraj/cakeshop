
ProductList
import styled from "styled-components"
import AllProductsView from "../components/AllProductsView";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container=styled.div`
height: 100vh;
`;




// 4th part
const ProductList = () => {
  return (
    <Container>
      <Navbar/>
        
  
       <AllProductsView/>

<Footer/>

    </Container>
    
  )
}

export default ProductList