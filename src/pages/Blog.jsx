import React from 'react';
import BlogList from '../components/blog/BlogList';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';

const Blog = () => {
  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <BlogList />
    </>
  );
};

export default Blog;
