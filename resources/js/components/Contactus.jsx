

import React, { useState } from "react";

import styled from 'styled-components'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';



const Heading = styled.div`
    font-size:40px;
    font-weight:bolder;
    text-align:center;
    padding-bottom:30px;
    background-color: var(--lightpink);
height: 30px;
color: #de5a70;
text-align: center;
padding-top: 5px;
margin-top: 40px;
margin-bottom:40px;
`
const ContactContainer = styled.div`
    display:flex;




`
const Map = styled.iframe`
margin-left:150px;
height:450px;
width:650px;

`
const Left = styled.div`

`
const Right = styled.div`
    font-size:30px;
    width:97%;
    height:500px;

`
const Row = styled.div`
    display:flex;
    padding-left:100px;
    padding-top:20px;
`
const Cicon = styled.div`
    padding-right:50px;
`
const Ctext = styled.div`

`
const Ccointainer = styled.div`
background-color:#fdf5fc;
`
const Content = styled.div`
`

const Contactus = () => {

    const [contactus, setContactus] = useState([]);

    const fetchUserData = () => {


        fetch("http://127.0.0.1:8000/api/contactus")
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == "success") {
                    setContactus(data.data);
                    console.log("fetch Contactus data:", data.data);
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
        <Ccointainer id='contactus'>
            <Heading>Contact Us</Heading>
            {contactus && contactus.map((item, index) => (
                <Content key={index}>

                    <ContactContainer>
                        <Left>


                            <Map src={item.map}></Map>

                        </Left>
                        <Right>
                            <Row>
                                <Cicon><LocationOnOutlinedIcon fontSize='large' />
                                </Cicon>
                                <Ctext>Our Office Address<br />
                                    {item.address}
                                </Ctext>
                            </Row>
                            <Row>
                                <Cicon><EmailOutlinedIcon fontSize='large' />
                                </Cicon>
                                <Ctext>General Enquiries<br />
                                    {item.mail}
                                </Ctext>
                            </Row>
                            <Row>
                                <Cicon><LocalPhoneOutlinedIcon fontSize='large' />
                                </Cicon>
                                <Ctext>Call Us<br />
                                    {item.phone}</Ctext>
                            </Row>
                            <Row>
                                <Cicon><AccessTimeOutlinedIcon fontSize='large' />
                                </Cicon>
                                <Ctext>Our Timing<br />
                                    {item.date}
                                </Ctext>
                            </Row>
                        </Right>

                    </ContactContainer >

                </Content>
            ))}

        </Ccointainer>
    )
}

export default Contactus

