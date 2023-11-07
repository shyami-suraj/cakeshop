import React, {useState} from 'react'
import styled from 'styled-components'
// import Cakeshop from "../../Img/cakeshop.jpg"


const AContainer = styled.div`
display:flex;
width:97%;
margin-top:50px;

`
const Left = styled.div`

width:97%;

`
const Leftcontaint = styled.div`
border:dashed var(--mainColor) 3px;
margin:10px;
width:97%;
height:100%;
`
const AHeading = styled.h1`
text-align:center;
`
const Atext = styled.h3`
padding:10px;
`
const Right = styled.div`

width:97%;


`
const Image = styled.img`

height:100%;
    width:97%;
    padding:2%;

`

const Aboutus = () => {

  // fetching data from database using api
  const [aboutus, setAboutus] = useState([]);

  const fetchUserData = () => {


      fetch("http://127.0.0.1:8000/api/aboutus")
          .then(response => {
              return response.json()
          })
          .then(data => {
              if (data.status == "success") {
                setAboutus(data.data);
                  console.log("fetch Aboutus data:", data.data);
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
    <div id="aboutus">
    {aboutus &&aboutus.map((item,index) => (
    <AContainer key={index}>


        <Left ><Leftcontaint><AHeading>{item.title}</AHeading>
        <Atext>{item.desc}</Atext></Leftcontaint>
        </Left>


        <Right><Image src={'/images/'+item.image} alt="" /></Right>
        </AContainer>
 
        ))}
    
    </div>
  )
}

export default Aboutus
