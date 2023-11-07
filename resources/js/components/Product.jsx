import { ShoppingCartOutlined, Favorite } from "@material-ui/icons";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Swal from "sweetalert2";

const Info = styled.div`
opacity:0;
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:rgba(0,0,0,0.2);
z-index:2;
display:flex;
align-items:center;
justify-content:center;
transition:all 0.5s ease;
cursor:pointer;
transition:2s;
overflow: hidden;

`;

const Container = styled.div`
flex:1;
margin:5px;
min-width:280px;
max-width: 281px;
height:350px;
display:flex;
justify-content:center;
align-items:center;
background-color:#fdf5fc;
position:relative;
flex-direction: column;

&:hover ${Info}{
    opacity:1;
}
`;



const Image = styled.img`
height:75%;

/* width:100%; */
`;

const Icon = styled.div`
width:40px;
height:40px;
border-radius:50%;
background-color:white;
display:flex;
justify-content:center;
align-items:center;
margin:10px;
transition:all 0.5s ease;

&:hover{
    background-color:#e9f5f5;
    transform:scale(1.1);
}
`;


const Txt = styled.h3`
/* background-color: blue; */
margin:0px;
`;

const Price = styled.h4`
/* background-color: green; */
margin: 5px;
`;


// 4th part
const Product = ({ item }) => {
  // to link to product page
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')

  let navigate = useNavigate()
  const routeProduct = () => {
    let path = `/@/product/${item.slug}`;
    navigate(path);
  }
  //localStorage.setItem("wishlistId", '')
  const [bgColor, setBgColor] = useState("black")


  let w = localStorage.getItem("wishlistId")
  if (w == undefined || w == '') w = [];
  else w = JSON.parse(w)

  const [my_wishlist, SetMyWishlist] = useState(w)


  const addToWishlist = (product_id) => {
    //console.log("BGcolor:", bgColor)


    if (user_id != null) {
      if (!my_wishlist.includes(product_id)) {




        let dataToSend = { token: token, user_id: user_id, product_id: item.id };
        console.log("dataToSend:", dataToSend)
        let formBody = [];
        for (let key in dataToSend) {
          let encodedKey = encodeURIComponent(key);
          let encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("form body:", formBody)

        fetch("http://127.0.0.1:8000/api/wishlist/store", {

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


              //  storing fav products in localstorage by declaring variable wishlistId i.e product id

              let wishlistIds = localStorage.getItem("wishlistId")
              if (wishlistIds == undefined || wishlistIds == '') wishlistIds = [];
              else wishlistIds = JSON.parse(wishlistIds)
              console.log("whislistId:", wishlistIds)

              // wishlistId = item.id
              wishlistIds.push(product_id);
              SetMyWishlist(wishlistIds)
              const jsonArray = JSON.stringify(wishlistIds);

              localStorage.setItem("wishlistId", jsonArray)
              console.log("whislistId:", wishlistIds)




              Swal.fire({
                // title: "success",
                text: "Successfully Added to Wishlist",
                // icon: "success",
                position: 'top-right',
                timer: 2000,
                showConfirmButton: false,
              });
              // if(bgColor === "red"){
              //   setBgColor("black")
              // }else{
              //   setBgColor("red")
              // }


              //setBgColor("red")




              // for automatically displaying email & password of users in login form after they successfully registered
              // localStorage.setItem('email', email);
              // localStorage.setItem('password', password);

              // navigate(path);


            }
            else {
              console.log("wishlist failed")
            }
          });
      }
      else {
        console.log("call delete api")

        let dataToSend = { user_id: user_id, item_id: item.id };
        let formBody = [];
        for (let key in dataToSend) {
          let encodedKey = encodeURIComponent(key);
          let encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("form body:", formBody)
        console.log("url:", "http://127.0.0.1:8000/api/wishlist/destroy/" + item.id);

        fetch("http://127.0.0.1:8000/api/wishlist/destroy/" + user_id, {

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


              // for removing / deleting product
              let wishlistIds = localStorage.getItem("wishlistId")
              if (wishlistIds == undefined || wishlistIds == '') wishlistIds = [];
              else wishlistIds = JSON.parse(wishlistIds)
              console.log("whislistId:", wishlistIds)

              // wishlistIds.pop(product_id);
              //let index = wishlistIds.findIndex(element => element.id === product_id)
              console.log("before delete whislistId:", wishlistIds)
              let index = wishlistIds.indexOf(product_id);
              console.log("index:", index)
              wishlistIds = wishlistIds.toSpliced(index, 1)

              console.log("after delete whislistId:", wishlistIds)
              SetMyWishlist(wishlistIds)
              const jsonArray = JSON.stringify(wishlistIds);

              localStorage.setItem("wishlistId", jsonArray)
              //window.location.reload(false);



              Swal.fire({
                // title: "success",
                text: "Removed from the wishlist",
                // icon: "success",
                timer: 2000,

                // confirmButtonText: "Go to login",
              });

              //window.location.reload(true);






              // for automatically displaying email & password of users in login form after they successfully registered
              // localStorage.setItem('email', email);
              // localStorage.setItem('password', password);

              // navigate(path);


            }
            else {
              console.log("wishlist failed")
            }
          });
      }



    }






    else {
      Swal.fire({
        title: 'Please login to add to wishlist',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Go to login',
        denyButtonText: 'Cancel',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          // denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          let path = `/@/login`;
          navigate(path);
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })


    }



  }



  return (

    <Container>
      {/* <Circle/> */}
      <Image src={'/images/' + item.image} />
      <Price>Rs.{item.price}</Price>
      <Txt>{item.name}</Txt>
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={routeProduct} />
        </Icon>

        <Icon >
          {/* <Favorite onClick={()=>{
            style={{color:"red"}}
           }}/> */}
          {/* variable */}
          <Favorite onClick={() => { addToWishlist(item.id) }} style={{ color: my_wishlist.includes(item.id) ? 'red' : 'black' }} />
        </Icon>
      </Info>
    </Container>
  )
}

export default Product
