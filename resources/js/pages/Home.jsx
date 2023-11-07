import React from 'react'


import ImgSlider from '../components/ImgSlider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contactus from '../components/Contactus'
import Aboutus from '../components/Aboutus'
// import { BrowserRouter } from 'react-router-dom'



const Home = () => {
  return (
    <>


    <Navbar />
    <ImgSlider/>
    <Aboutus/>
    <Categories/>
    <Products/>
    <Contactus />
    <Footer/>
    {/* <Cart/> */}


    </>
  )
}

export default Home
