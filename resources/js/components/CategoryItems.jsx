// fetching data from api for categories displaying in front

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
// import Swal from 'sweetalert2'



const Image = styled.img`
width:80%;
height:80%;
/* / object-fit:contain; / */
border-radius: 90%;
/* / background-size: 100% 100%; / */
transition:all 1.5s ease;
cursor:pointer;
position: absolute;
left:28px;
top:15px;
margin-top: 25px;
margin-left  : 5px;







`;


const Container = styled.div`
flex:1;
margin:10px;
height:55vh;
position:relative;
left:0;
/* / top:5px; / */
background-color:var(--lightpink);


&:hover ${Image}{
    transform: scale(1.2);

}



`;
const Imgcontainer=styled.div`
  overflow: hidden;
    /* / height: 100%; / */


`;

const Info = styled.div`
position:absolute;
top:45%;
left:0;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-size:20px;




`;
const Title = styled.h2`

color:black;
margin-bottom:10px;
background-color: white;
opacity: 0.5;
font-size:25px;

`;
const Button = styled.button`
padding:10px;
background-color:white;
color:black;
cursor:pointer;
font-weight:600;

&:hover{
    background-color:var(--lightpink);
    color:var(--mainColor);
  
}



`;
const CategoryItems = ({item}) => {

  // let navigate=useNavigate()
  // const routeproductlist = () => { 
  //     let path = `/productlist`; 
  //     navigate(path);
  //   }

    let navigate=useNavigate()
    const routecategorylist = () => { 
        let path = `/@/category/${item.slug}`; 
        navigate(path);
      }
  
  return (
    <Container>
            
            <Imgcontainer>
            <Image src={'/images/'+ item.image}></Image>
            </Imgcontainer>
            <Info>
                <Title>{item.name}</Title>
                <Button onClick={routecategorylist} >ORDER NOW</Button>
            </Info>
        </Container>
  )
}

export default CategoryItems