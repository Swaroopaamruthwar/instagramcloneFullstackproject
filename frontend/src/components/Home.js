import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login';
import Posts from './Posts';
import PostState from "../context/posts/postState";
import Postitem from './Postitem';
function Home() {
  return (
    <BrowserRouter>
      <PostState>

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/post" exact element={<Posts />}/>
        </Routes>
      </PostState>
    </BrowserRouter>
  )
}

export default Home