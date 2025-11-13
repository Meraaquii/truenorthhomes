import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BlogHero from '../BlogHero/BlogHero';
import BlogDetails from '../BlogDetails/BlogDetails';

const Blog = () => {
  const location = useLocation();

  // Check if the current URL is exactly /blog
  const isMainBlogPage = location.pathname === '/blog';

  return (
    <>
      {isMainBlogPage ? (
        <>
          <BlogHero />
          <BlogDetails />
        </>
      ) : (
        <Outlet /> 
      )}
    </>
  );
};

export default Blog;
