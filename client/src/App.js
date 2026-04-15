import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Services from './components/Services/Services';
import Stylist from './components/Stylist/Stylist';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Enquiry from './components/EnquiryPage/Enquiry';
import Footer from './components/Footer/Footer';
import Services_2 from './components/Services2/Services2';
import Testimonials from "./components/Testimonials/Testimonials";
import About_2 from "./components/About2/About2";
import Portfolio_2 from "./components/Portfolio2/Portfolio2";
import AdminAuth from "./components/AdminAuth/AdminAuth";
import  Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home Page (all sections together) */}
        <Route 
          path="/" 
          element={
            <>
              <HomePage />
              <Stylist />
              <Portfolio />
              <Services />
              <About />
              <Testimonials />
              <Footer />
            </>
          } 
        />
          {/* Admin Login */}
        < Route path="/admin/dashboard" element={<Dashboard />} /> 
        <Route path="/admin/login" element={<AdminAuth />} />
        <Route path="/services" element={<Services_2 />} />
        <Route path="/about" element={<About_2 />} />
        <Route path="/portfolio" element={<Portfolio_2 />} />
        {/* Enquiry Page */}
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
    </Router>
  );
}

export default App;