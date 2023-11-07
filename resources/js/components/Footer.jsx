import { Facebook, Instagram } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
background-color:var(--mainColor);
height:100px;
width:100%;
display:flex;
color:white;




`;

const Right = styled.div`
padding-top:2%;
padding-right:1%;



`;
const Center = styled.div`
margin:auto;
display: flex;


`;
const Left = styled.div`

padding-top:2%;
padding-left:1%;



`;
const Title = styled.h3`


`;




const Footer = () => {
    return (
        <Container>

            <Left>
 <Title>Designed and Developed by GtechVision</Title>

            </Left>
            <Center>
<Instagram fontSize='large'/>
<Facebook fontSize='large'/>
            </Center>
            <Right>

<Title>Copyright © 2023. All rights reserved.</Title>
            </Right>
        </Container>
    )
}

export default Footer
