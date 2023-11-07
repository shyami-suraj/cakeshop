import styled from "styled-components"
import { Add, Remove } from "@material-ui/icons"
import { useNavigate } from 'react-router-dom';
// import { useState } from "react"
// import { singleProduct } from "../data"
import Navbar from "../components/Navbar";
import { useParams,useLocation } from "react-router-dom";
 import React, { useState } from "react";
import Footer from "../components/Footer";






const Container = styled.div`
background-color: #fbf0f4;
`;
const Wrapper = styled.div`
padding:50px;
display:flex;

`;
const ImgContainer = styled.div`
flex:1;

`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
object-fit: contain;

`;
const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
`;
const Title = styled.h1`
margin: 0px;
    font-weight:bold;
    /*  color:#EC407A;  */
    /*  font-style:italic; */

`;
// const Desc = styled.p`
//     margin:20px 0px;
//     / / color:#EC407A; / /
//     / / font-style:italic; / /

// `;
const Price = styled.h2`
font-weight: bold;
font-size:20px;
padding: 10px;

`;







const Text = styled.p`
font-size:20px;
margin-bottom: 10px;

`;
const Input = styled.input`
    border:1px solid black;
    outline: 0;
    padding-left: 10px;
    height: 30px;
    width: 100%;

`;


const StyledForm = styled.form`

 `;
// const StyledInput = styled.input`

//  `;
const StyledFieldset = styled.fieldset`
    /* border:1px solid black;  */
    border:none;
    padding:10px;
    margin:10px 0;
    font-size    :20px ;

     legend{
        margin-top: 10px;
        padding:0 10px;

    }
    label{
        padding-right: 20px;
        width:100%;
    }
    input{
        margin-right:10px ;

    }
 `;


const FilterContainer = styled.div`
    width:50%;
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
 /* color:#EC407A; */

`;

const Filter = styled.div`
    display:flex;
    align-items: center;

`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight:bold;

`;

// const FilterColor = styled.div`
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background-color:${props => props.color};
//     margin:0px 5px;
//     cursor: pointer;
// `;
const FilterSize = styled.select`
outline: 0;
    background-color:#EC407A;
    color:white;
    border:none;
    margin-left: 10px;
    padding: 5px;
    height: 30px;
`;
const FilterSizeOption = styled.option`
    background-color:var(--lightpink);
    color:black;




`;
const AddContainer = styled.div`
  width: 50%;
  display:flex;
  justify-content: space-between;
  align-items: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #EC407A;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px ;
    border: 1px solid #EC407A;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0px 5px;
    color: #EC407A;
`;

const Button = styled.button`
padding: 15px;
border: 2px solid #EC407A;;
background-color: white;
cursor: pointer;
font-weight: bold;
color: #EC407A;
margin-top: 20px;

&:hover{
    background-color:var(--lightpink);
    color:var(--mainColor);


}

`;



// Individual product
const Product = ({props,route}) => {

  let { slug } = useParams();

  const [productDetail,setProductDetail] =useState('');

const location =useLocation();

const image_url ="http://127.0.0.1:8000/images/";
const id =new URLSearchParams(location.search).get('id');



//to clear session
// sessionStorage.setItem('cart', [])
// console.log('topcart',JSON.parse(sessionStorage.getItem('cart')));

// React.useEffect(() => {
//     // Update the document title using the browser API

//       },
//       []);
console.log("props:",props);



const fetchUserData = () => {

// this helps to fetch our data from db
// we need to create api controller and make function within where we pass our data from db as response in json format then we create api route in which we call our function at the end along with @
    fetch("http://127.0.0.1:8000/api/product_detail/" +slug)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // checking whether data are being fetched from db or not
        console.log("detail:",data);

// this helps to display fetched data from db to our frontend part by using setProductDetail & setActuleprice
        if(data.status =="success"){
        setProductDetail(data.data);
        setActuleprice(data.data.price)

        console.log("fetch data:",data.data);
        }
        else{
            "Error on data fetching."
        }

      })
  }

  React.useEffect(() => {
    // Update the document title using the browser API
    fetchUserData();
    const logindetail=localStorage.getItem('user_id');
    console.log('user_id:',logindetail)

      },
      []);

    let navigate = useNavigate()
    const routeCart = () => {
        let path = `/@/cart`;
        navigate(path);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "textoncake") {
          setTextoncake(value);
        }}


    const [textoncake,setTextoncake]=useState('');
    const [quantity, setQuantity] = useState(1);
    const [actuleprice,setActuleprice]=useState('');
    const [eggless, setEggless] = useState('no');
    const [sugarless, setSugarless] = useState('no');
    // const [pic, setPic] = useState(false);

    const timestamp= Date.now();
    console.log('id',productDetail.id)


    console.log('timestamp',timestamp)

    const increment = () => {
        setQuantity(quantity + 1);
        setActuleprice(((productDetail.price)*(quantity+1)));

    }

    const decrement = () => {
        setQuantity(quantity - 1)
        setActuleprice((actuleprice-productDetail.price));
        if (quantity <= 1 && actuleprice<=productDetail.price) {
            setQuantity(1)
            setActuleprice(productDetail.price)
        }
    }

    const handleCheckbox=(event)=>{
        setSugarless(event.target.value);


    }
    const handleCheckbox1=(event)=>{
        setEggless(event.target.value);


    }
    return (

        <Container>
            <Navbar/>

            <Wrapper>

                <ImgContainer>
                    <Image src={image_url+productDetail.image} />
                </ImgContainer>
                <InfoContainer >
                    <Title>{productDetail.name}</Title>
                    <Price>
                        {/* {(actuleprice == undefined || actuleprice == '') ?
                            productDetail.price
                        :

                            {actuleprice}

                        } */}
                        Rs: {actuleprice}
                    </Price>

                    <Text> What to write on this cake? </Text>
                    <Input placeholder="Happy Birthday" onChange={(e) => handleInputChange(e)} id="textoncake"></Input>


                    <StyledForm>
                        <StyledFieldset>
                            <legend></legend>
                            <legend>Make it Eggless?</legend>
                            <label >
                                <input type="radio" value="yes" name="eggless" onChange={handleCheckbox1}checked={ eggless=='yes'} />Yes (+NPR. 100 )  <br></br>
                                <input type="radio" value="no" name="eggless" onChange={handleCheckbox1} checked={ eggless=='no'}  />No
                            </label>

                            <legend>Do you need Sugarless?</legend>
                            <label >
                                <input type="radio" value="yes" name="sugarless" onChange={handleCheckbox} checked={ sugarless=='yes'} />Yes (+NPR. 50) <br></br>
                                <input type="radio" value="no" name="sugarless" onChange={handleCheckbox} checked={ sugarless=='no'} />No
                            </label>

                            {/* <legend>Add Image on Cake?</legend>
                            <label >
                                <input type="radio" value="yes" name="pic"onClick={()=>setPic(true)} />Yes (+NPR. 300 ) <br></br>
                                <input type="radio" value="no" name="pic"onClick={()=>setPic(false)} />No
                            </label> */}
                        </StyledFieldset>

                    </StyledForm>





                    <FilterContainer>


                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                <FilterSizeOption>1 Pound</FilterSizeOption>
                                <FilterSizeOption>2 Pound</FilterSizeOption>
                                <FilterSizeOption>3 Pound</FilterSizeOption>
                                <FilterSizeOption>1 KG</FilterSizeOption>
                                <FilterSizeOption>2 KG</FilterSizeOption>
                            </FilterSize>
                        </Filter>

                    </FilterContainer>
                    <AddContainer>

                        <AmountContainer>
                            <Remove onClick={decrement} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={increment} />
                        </AmountContainer>



                    </AddContainer>
                    <Button onClick={() => {
                        // sending frontend and db data into session : first we store (data to be pass) in object formate in a variable
                        const item = {
                            timestamp:timestamp,
                            id: productDetail.id,
                            slug:  productDetail.slug,
                            name: productDetail.name,
                            price: actuleprice,
                            image: productDetail.image,
                            eggless: eggless,
                            sugarless:sugarless,
                            quantity:quantity,
                            // pic:pic,
                            textoncake:textoncake,


                        }
                        // checking wether data has been stored or not in above item variable from frontend and db
                         console.log("item to send in session:",item)


                        let cart = localStorage.getItem("cart")
                        if(cart == undefined || cart == '') cart = [];
                        else cart = JSON.parse(cart)
                        cart.push(item);
                        const jsonArray = JSON.stringify(cart);
                        localStorage.setItem("cart",jsonArray)

                        routeCart();
                        increment();
                    }}>ADD TO CART</Button>
                </InfoContainer>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Product
