import React, { useEffect, useState } from "react";
import { Collapse } from "bootstrap";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

function Sidebar() {
  // const [toggleComponents, setToggleComponents] = useState(true);
  // const [toggleUtilities, setToggleUtilities] = useState(false);

  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   const decodedtoken = jwt.decode(localStorage.getItem("token"));
  //   setUser(decodedtoken.Username);
  //   console.log(decodedtoken.Username);
  // }, []);

  // const handleCollapseComponent = () => {
  //   setToggleComponents(!toggleComponents);
  //   var myCollapse = document.getElementById("collapseComponents");
  //   var bsCollapse = new Collapse(myCollapse);
  //   toggleComponents ? bsCollapse.show() : bsCollapse.show();
  // };

  // const handleToggleUtilities = () => {
  //   setToggleUtilities(!toggleUtilities);
  //   var myCollapse = document.getElementById("collapseUtilities");
  //   var bsCollapse = new Collapse(myCollapse);
  //   toggleComponents ? bsCollapse.show() : bsCollapse.show();
  // };

  const handleSubmit = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-building"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Restaurant App</div>
      </a>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li class="nav-item active">
        <Link class="nav-link" to="/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Home</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div class="sidebar-heading">Filters</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li class="nav-item">
        <a
          class="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-fw fa-filter"></i>
          <span>Filter (By Rating)</span>
        </a>
        <div
          id="collapseComponents"
          class="collapse show"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Ratings</h6>
            <Link
              class="collapse-item"
              to="/ratingfilter?filter=hightolow"
              onClick={handleSubmit}
            >
              High to Low
            </Link>
            <Link
              class="collapse-item"
              to="/ratingfilter?filter=lowtohigh"
              onClick={handleSubmit}
            >
              Low to High
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Utilities Collapse Menu --> */}
      <li class="nav-item">
        <a
          class="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-fw fa-filter"></i>
          <span>Filter (By location)</span>
        </a>
        <div
          id="collapseUtilities"
          class="collapse show"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Locations:</h6>
            <Link
              class="collapse-item"
              to="/locationfilter?Chennai"
              onClick={handleSubmit}
            >
              Chennai
            </Link>
            <Link
              class="collapse-item"
              to="/locationfilter?Mumbai"
              onClick={handleSubmit}
            >
              Mumbai
            </Link>
            <Link
              class="collapse-item"
              to="/locationfilter?Goa"
              onClick={handleSubmit}
            >
              Goa
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

      {/* <!-- Sidebar Message --> */}

      {/* <img class="sidebar-card-illustration mb-2" src={undrawRocketImage} alt="..."/> */}
      {jwt.decode(localStorage.getItem("token")).Username === "admin" ? (
        <div>
          <div class="sidebar-card d-none d-lg-flex">
            <p class="text-center mb-2">
              <strong>You're an admin</strong> If you wish to add restaurant,
              click on the button below!
            </p>
            <Link
              class="btn btn-success btn-sm"
              to="/addrestaurant"
              style={{ marginLeft: "15px" }}
            >
              Add Restaurant
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Sidebar;
