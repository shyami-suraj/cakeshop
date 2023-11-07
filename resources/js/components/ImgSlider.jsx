import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import React,{ useState } from "react";
import styled from 'styled-components'
import { sliderItems } from "../data"
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
width:100%;
height:100vh;
display:flex;
position:relative;
overflow:hidden;
margin-top:10px;

`;
const Arrow = styled.div`
width:50px;
height:50px;
background-color:#FFEBEE;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:80px;
left:${props => props.direction === "left" && "20px"};
right:${props => props.direction === "right" && "20px"};
margin:auto;
cursor:pointer;
opacity:0.5;
z-index:2;

`;
// left/right

const Wrapper = styled.div`
height:100%;
display:flex;
transform:translateX(${props => props.slideIndex * -100}vw);
transition:all 1.5s ease;


`;

const Slide = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
background-color:#${props => props.bg};


`;


const ImgContainer = styled.div`
height:100%;
flex:1;


`;

const Image = styled.img`
height:100%;
width:80%;





`;

const InfoContainer = styled.div`
flex:1;
padding:50px;


`;

const Title = styled.h1`
font-size:70px;


`;

const Desc = styled.p`
margin:50px 0px;
font-size:20px;
font-weight:500;
letter-spacing:3px;

`;

const Button = styled.button`
padding:10px;
font-size:20px;
background-color:transparent;
cursor:pointer;

&:hover{
    background-color:var(--lightpink);
    color:var(--mainColor);

}

`;

const ImgSlider = () => {
    let navigate = useNavigate()
    const routeProductList = () => {
        let path = `/@/productlist`;
        navigate(path);
    }

    const [sliderCounter, setSliderCounter] = useState('');

    const [slideIndex, setSlideIndex] = useState(0);
    // Nested arrow func for handling click event
    const handleClick = (direction) => {

        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderCounter-1);
        } else {
            setSlideIndex(slideIndex < sliderCounter-1 ? slideIndex + 1 : 0);
        }
    };




    const [slider, setSlider] = useState('');
    // const [count, setCount] = useState(0);
    const fetchUserData = () => {


        fetch("http://127.0.0.1:8000/api/slider")
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == "success") {
                    setSlider(data.data);
                    setSliderCounter(data.data.length)
                    console.log("slider data:", data.data);
                    console.log("slider data l:", data.data.length);

                    // let counter = 0;
// for (let i = 0; i < data.data.length; i++) {
//   if (data.data[i].status === '0') counter++;
//   console.log("no of ",counter)


// }

                }

                else {
                    "Error on data fetching."
                }

            })
    }

    //   function updateCounter(){
    //     setCount(count+1);


    //     //setCat('test');

    //   }

    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();

    },
        []);

    return (
        <Container>
            {/* function with parameters name= handleClick("left")*/}
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            {slider &&
                <Wrapper slideIndex={slideIndex}>
                    {slider.map(item => (
                        <Slide bg={item.bg} key={item.id} >
                            <ImgContainer>
                                <Image src={'/images/'+item.image} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.name}</Title>
                                <Desc>{item.detail}</Desc>
                                <Button onClick={routeProductList} >ORDER NOW</Button>
                            </InfoContainer>
                        </Slide>
                    ))}

                </Wrapper>
            }
            {/* function with parameters name= handleClick("right")*/}
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>












    )
}

export default ImgSlider
