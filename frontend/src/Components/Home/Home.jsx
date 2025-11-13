import React from 'react'
import Slider from '../../Components/Slider/Slider'
import AboutUs from '../../Components/AboutUs/AboutUs'
import Founder from '../../Components/Founder/Founder'
import Featured from '../../Components/Featured/Featured'
import Experience from '../../Components/Experience/Experience'
import Contact from '../../Components/Contact/Contact'
import Testimonials from '../../Components/Testimonials/Testimonials'

const Home = () => {
  return (
    <>
      <Slider/>
      <AboutUs/>
      <Founder/>
      <Featured/>
      <Experience/>
      <Contact/>
      <Testimonials/>
    </>
  )
}

export default Home
