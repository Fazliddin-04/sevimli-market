import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from "./components/layout/Navbar";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-slate-900 dark:text-white transition ">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
