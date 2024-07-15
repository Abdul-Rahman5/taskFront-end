import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logoRoute.jpeg";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard"); // تغيير هذا النص بالرابط الافتراضي الذي تريد أن يكون نشطًا

  const toggleNavbar = () => {
    setShow(!show);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className={`col-md-2    px-0 mainBG-side ${show ? "show" : ""}`}>
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <Link to="/" className="d-flex align-items-center mt-4 justify-content-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img className="w-50 rounded-circle border border-2" src={logo} alt="Logo" />
          </Link>
          <ul className="nav w-100 nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item w-100 my-2">
              <Link to="/" className={`nav-link text-white align-middle ${activeLink === "Dashboard" ? "active" : ""}`} onClick={() => handleLinkClick("Dashboard")}>
                <i className="fa-solid fa-gauge"></i>
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item w-100 my-2">
              <Link to="/customerTable" className={`nav-link text-white align-middle ${activeLink === "Customers" ? "active" : ""}`} onClick={() => handleLinkClick("Customers")}>
                <i className="fa-solid fa-users"></i>
                <span className="ms-1 d-none d-sm-inline">Customers</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-10 mainBG_home">
        
        <div className="row">
          <div className="col-md-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
