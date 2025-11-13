import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './Components/About/About'
import Blog from './Components/Blog/Blog'
import Project from './Components/Project/Project'
import Career from './Components/Career/Career'
import Blog1 from './Components/Blog1/Blog1'
function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path="blog" element={<Blog />}>
          <Route path="affordable-housing-projects-in-south-kolkata-which-developers-are-leading-the-way" element={<Blog1 />} />
        </Route>

        <Route path='project' element={<Project />} />
        <Route path='career' element={<Career />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
