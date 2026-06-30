import React from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom'

import { Button } from './components/ui/button.jsx'

import  Home  from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Verify from './pages/Verify.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Layout from './Layouts/Layout.jsx'
import Profile from './pages/Profile.jsx'
import Products from './pages/Products.jsx'

const App = () => {
  return (
     <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Route>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
