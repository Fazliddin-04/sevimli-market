import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/layout/Navbar";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

function App() {
  
  return (
    <>
      <Router>
        <div className={`relative bg-white dark:bg-slate-900 text-black dark:text-white transition duration-500]`}>
          <Navbar />
          <Content />
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
