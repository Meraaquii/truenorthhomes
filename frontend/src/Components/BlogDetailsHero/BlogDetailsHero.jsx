import React from 'react'
import './BlogDetailsHero.css';
import bg from '../../assets/BlogDetImg.png'
const BlogDetailsHero = () => {
  return (
    <div className='blog-details-hero-wrapper'>
      <div className="blog-details-hero">
            <img src={bg} alt="" />
      </div>
    </div>
  )
}
 
export default BlogDetailsHero
