
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

import { Add, Remove } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Container = styled.div`

`;
const Wrapper = styled.div`
   padding: 20px;
`;
const Title = styled.h1`
   font-weight: 500;
   text-align: center;
   color:#EC407A;
`;
const Top = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding: 20px;
    color:#EC407A;
`;
const Update = styled.button`
    padding: 10px;
    font-weight: 600;
     /* margin-left: 60%; */
    cursor: pointer;
    border:${(props) => props.type === "filled" && "none"};
    background-color:${(props) => props.type === "filled" ? "#EC407A " : "transparent"};
    color:${(props) => props.type === "filled" && "white"};

`;
const TopTexts = styled.div`
     font-weight: 500;
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  color:#EC407A;
  font-weight: 500;
`;
const Info = styled.div`
  flex:3;

`;
const Product = styled.div`
 display: flex;
 justify-content:space-between ;

`;
const ProductDetail = styled.div`
   flex:2;
   display: flex;
`;
const Image = styled.img`
    width: 200px;
    margin: 10px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`

`;
const ProductId = styled.span`

`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius:50% ;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`

`;
const PriceDetail = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;
const Hr = styled.hr`
width:97%;

`;
const Summary = styled.div`
  flex:1;
  border:2px solid #EC407A;
  border-radius: 10px;
  padding: 20px;
  height: 47vh;

`;
const SummaryTitle = styled.h1`
font-weight: 400;
`;
const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props => props.type === "total" && "500"};
font-size: ${props => props.type === "total" && "24px"};



`;
const SummaryItemText = styled.span`


`;
const SummaryItemPrice = styled.span`

`;
const Button = styled.button`
width: 100%;
padding: 10px;
background-color: #EC407A;
color: white;
border: none;
font-weight: 600;

`;
const Removeitem = styled.button`
height:50px;
margin-top:5%;
margin-right:50px;

padding: 10px;
background-color: #EC407A;
color: white;
border: none;
font-weight: 600;
cursor: pointer;

`;
const EmptyWrapper = styled.div`
height:80vh;
`



const Cart = () => {


    //let sub_total = 0;
    let navigate = useNavigate()
    const routeProductlist = () => {
        let path = `/@/productlist`;
        navigate(path);
    }
    const async_dataa = localStorage.getItem("cart");
    console.log('async_data:', async_dataa)
    var parsedObject = (async_dataa == '') ? [] : JSON.parse(async_dataa);
    let cartlength=0;

    localStorage.setItem("cartlength",parsedObject.length);
    const length = localStorage.getItem("cartlength");
    console.log('length',length);




    console.log("cartlength",cartlength)

    let tot = 0;

    parsedObject && parsedObject.forEach((item) => {
        console.log('price' + item.price);
        tot += parseFloat(item.price);
    });
    let shipingcost = 150;
    let totalcost = 0;
    let discount = 0;
    //setSubtotal(tot);
    //sub_total =  tot;
    const [sub_total, setSubtotal] = useState(tot);


    totalcost = parseFloat(sub_total) + parseFloat(shipingcost) - parseFloat(discount);
    console.log('totalcost: ' + totalcost);

    console.log('subtotal: ' + sub_total);

    //console.log("async dataa in cart page:",parsedObject);
    const routeOrderNow = () => {
        let path = `/@/OrderNow `;
        navigate(path);
    }

    const [updated, setUpdated] = useState('')



    const increment = (timestamp, quantity, price) => {
        console.log("price", price)
        console.log("id of cart", timestamp)
        console.log("item of cart", quantity)
        let new_obj = [];
        let tot = 0;
        parsedObject && parsedObject.forEach((item) => {
            console.log('Item: ', item.product_slug);
            if (timestamp == item.timestamp) {
                let cart_qty = item.quantity;
                let unit_price = item.price / cart_qty;
                item.quantity = cart_qty + 1;
                let actualprice = unit_price * item.quantity;
                item.price = actualprice;

                console.log('actule price: ', actualprice);

            }
            tot += parseFloat(item.price);
            new_obj.push(item);
        })
        parsedObject = new_obj;
        localStorage.setItem("cart", JSON.stringify(new_obj));

        setSubtotal(tot);
        setUpdated(quantity + 1)
        console.log("increment item", parsedObject)



    }

    const decrement = (timestamp, quantity) => {
        let new_obj = [];
        console.log('quantity: ' + quantity);
        if (quantity == '1') return;
        let tot = sub_total;
        parsedObject && parsedObject.forEach((item) => {
            console.log('Item: ', item.product_slug);
            if (timestamp == item.timestamp) {
                let cart_qty = item.quantity;
                let unit_price = item.price / cart_qty;
                item.quantity = cart_qty - 1;
                let actualprice = unit_price * item.quantity;
                item.price = actualprice;
                tot -= parseFloat(unit_price);


            }

            new_obj.push(item);
        })


        //parsedObject = new_obj;
        console.log(new_obj);
        localStorage.setItem("cart", JSON.stringify(new_obj));

        setSubtotal(tot);
        setUpdated(quantity - 1)
    }

    const remove = (timestamp) => {
        let new_obj = [];
        parsedObject && parsedObject.forEach((item) => {
            console.log('Item: ', item.product_slug);
            if (timestamp != item.timestamp) {
                new_obj.push(item);
            }

        })
        localStorage.setItem("cart", JSON.stringify(new_obj));
        setUpdated(timestamp);
        window.location.reload(true);
    }


    const image_url = "http://127.0.0.1:8000/images/";

    return (
        <Container>
            <Navbar />
            {sub_total == 0
                ? (<EmptyWrapper>
                    <Update onClick={routeProductlist}>CONTINUE ORDERING</Update>
                    <Wrapper>
                        place your order to view cart
                    </Wrapper>
                </EmptyWrapper>
                )
                : (
                    <Wrapper>
                        <Title>YOUR ORDERS</Title>
                        <Top>
                            <Update onClick={routeProductlist}>CONTINUE ORDERING</Update>
                          
                        </Top>
                        <Bottom>
                                <Info>
                                {parsedObject &&
parsedObject.map((item, index) => (
                                        <>
                                            <Product key={index}>
                                                <ProductDetail>
                                                    <Image src={image_url + item.image} />
                                                    <Details>
                                                        <ProductName><b>Product:</b> {item.name}</ProductName>
                                                        <ProductName><b>text on cake:</b> {item.textoncake}</ProductName>
                                                    </Details>
                                                </ProductDetail>
                                                <PriceDetail>
                                                    <ProductAmountContainer>
                                                        <Add onClick={() => { increment(item.timestamp, item.quantity, item.price) }} />
                                                        <ProductAmount >{item.quantity}</ProductAmount>
                                                        <Remove onClick={() => { decrement(item.timestamp, item.quantity) }} />
                                                    </ProductAmountContainer>
                                                    <ProductPrice>{item.price}</ProductPrice>
                                                </PriceDetail>
                                                <Removeitem onClick={() => { remove(item.timestamp)  }}>Delete</Removeitem>
                                            </Product>
                                            <Hr />
                                        </>
                                    ))}
                                </Info>

                            <Summary>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>Subtotal:</SummaryItemText>
                                    <SummaryItemPrice>Rs.{sub_total}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Shipping Cost:</SummaryItemText>
                                    <SummaryItemPrice>{shipingcost}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Discount:</SummaryItemText>
                                    <SummaryItemPrice>Rs.{discount}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type="total">
                                    <SummaryItemText >Total:</SummaryItemText>
                                    <SummaryItemPrice>{totalcost}</SummaryItemPrice>
                                </SummaryItem>
                                <Button onClick={() => {
                                    const totalitem = {
                                        sub_total: sub_total,
                                        discount: discount,
                                        totalcost: totalcost,
                                        shipingcost:shipingcost,
                                    }
                                    console.log("item to send in session:", totalitem)
                                    const jsonArray = JSON.stringify(totalitem);
                                    localStorage.setItem("totalprice", jsonArray)
                                    routeOrderNow();
                                }}>CHECKOUT NOW</Button>
                            </Summary>

                        </Bottom>
                    </Wrapper>)
            }
            <Footer />
        </Container>
    )
}

export default Cart
