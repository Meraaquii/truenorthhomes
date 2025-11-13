import React from 'react'
import './BlogHero.css';
import bg from '../../assets/blog-banner.jpg';

const BlogHero = () => {
  return (
    <div className='blog-hero-wrapper'>
      <div className="blog-hero">
        <img src={bg} alt="" />
      </div>
    </div>
  )
}

export default BlogHero
