import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Careers from '../../pages/Careers'
import Category from '../../pages/Category'
import Contact from '../../pages/Contact'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import Faq from '../../pages/Faq'
import Profile from '../../pages/Profile'

function Content() {
  return (
    <div className='container mx-auto px-4 pt-32'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Content
