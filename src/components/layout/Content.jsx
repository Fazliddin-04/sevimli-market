import React from 'react'
import { useLocation } from 'react-router-dom'
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
import ForgotPassword from '../../pages/ForgotPassword'
import PrivateRoute from '../PrivateRoute'
import CreateListing from '../../pages/CreateListing'
import EditListing from '../../pages/EditListing'

function Content() {
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <div
      className={`min-h-screen ${
        pathMatchRoute('/sign-up') ||
        pathMatchRoute('/sign-in') ||
        pathMatchRoute('/profile') ||
        pathMatchRoute('/forgot-password')
          ? 'overflow-hidden relative z-[1] px-4 pt-32 pb-4 '
          : 'container mx-auto px-10 pt-32 pb-4'
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-listing/:listingId" element={<EditListing />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  )
}

export default Content
