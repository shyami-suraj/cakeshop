// format for our categories & fetching data from api
import styled from "styled-components"
//  import { fk_categories } from "../data"
import { Carousel } from "@trendyol-js/react-carousel";
import CategoryItems from "./CategoryItems";
import '../../css/app.scss';
import RightButton from '../../../public/images/right.png';
import LeftButton from '../../../public/images/left.png';
import React, { useState } from "react";


// import 'css/app.scss';
// import styles from '../css/app.css'






const Container = styled.div`
display:flex;
padding:20px;
justify-content:space-between;
height:440px;



`;
const Heading = styled.h1`


  background-color:var(--mainColor);

  text-align: center;
  margin-top:50px;  
  padding-top:25px;
  font-weight: bolder;
  color:white;


`;

const Categories = () => {
    const [categories, setCategories] = useState('');
    const fetchUserData = () => {

        
        fetch("http://127.0.0.1:8000/api/category")
          .then(response => {
            return response.json()
          })
          .then(data => {
            if(data.status =="success"){
            setCategories(data.data);
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

          },
          []);



    return (

        <Heading>CATEGORIES
            {/* <div>Counter: {count}</div> */}

{/* <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow> */}

            {/* <button onClick={updateCounter}>Click</button> */}
            
            <Container>
 {categories &&
                <Carousel 
                    show={4} 
                    slide={1} 
                    swiping={true} 
                    dynamic={true}
                    responsive={true}
                    leftArrow={<img class="slider-btn" src={LeftButton}/>}                     
                    rightArrow={<img class="slider-btn" src={RightButton}/>}
                     useArrowKeys={true}
                    children={categories.map((item, index) => {
                        return (<CategoryItems item={item} key={item.id} />)
                    })}
                    >
                    
                </Carousel> 
              }
            </Container>
        </Heading>

    )
}

export default Categories
