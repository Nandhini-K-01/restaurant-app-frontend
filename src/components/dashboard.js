import React from "react";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fontStyle } from "@mui/system";
import { Bookmark, StarRounded } from "@mui/icons-material";
import "../css/dashboard.css";
import ReactHtmlParser from "react-html-parser";

function Dashboard() {
  const [resDetails, setResDetails] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchFunction = (value) => {
    setSearch(value);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    async function getRestaurants() {
      const decodedtoken = jwt.decode(localStorage.getItem("token"));
      if (decodedtoken.exp * 1000 < Date.now()) {
        navigate("/");
      } else {
        const res = await axios
          .get("http://localhost:4000/restaurant/get", {
            headers: { accesstoken: localStorage.getItem("token") },
          })
          .then((res) => {
            console.log(res.data);
            setResDetails(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    getRestaurants();
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          <Topbar searchFunction={(value) => searchFunction(value)} />
          {resDetails
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((resDetails) => (
              <div
                className=" col-sm-12 col-md-4"
                style={{ display: "inline-block" }}
              >
                <div className="">
                  <div className="cover">
                    <Link to={`/resdetails/${resDetails._id}`}>
                      <img
                        src={resDetails.image}
                        alt="cover"
                        style={{
                          width: "20rem",
                          height: "15rem",
                          "object-fit": "cover",
                          "border-top-right-radius": "50px",
                          "border-top-left-radius": "50px",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <h4
                      style={{
                        color: "#4e73df",
                        fontStyle: "normal",
                        display: "inline-block",
                      }}
                    >
                      <Link to={`/resdetails/${resDetails._id}`}>
                        <strong style={{ display: "inline-block" }}>
                          {resDetails.name}
                        </strong>
                      </Link>
                    </h4>
                    <div>
                      <div style={{ color: "gold", display: "inline-block" }}>
                        <StarRounded />
                        <strong style={{ color: "black" }}>
                          {resDetails.rating === undefined
                            ? ""
                            : `${resDetails.rating}/5`}
                          <span style={{ color: "green" }}>
                            |{" "}
                            {resDetails.reviews === undefined
                              ? "No reviews yet"
                              : `${resDetails.reviews}reviews`}
                          </span>
                        </strong>
                      </div>
                    </div>
                    <div>
                      {ReactHtmlParser(truncate(resDetails.description, 170))}
                    </div>
                    <div
                      style={{ color: "chocolate", fontFamily: "sans-serif" }}
                    >
                      <LocationOnIcon></LocationOnIcon>
                      {resDetails.city}
                    </div>
                    {/* <div className={`isfavourite ${bookmark? "active": ""}`} onClick={()=>setBookmark(!bookmark)}>
          <Bookmark/>
          </div> */}
                  </div>
                  <hr />
                  {/* <div className="profile">
            <div>
            <img src={user.profile} alt="profile" style={{"width":"50px", "height":"50px"}}/>
            </div>
            <div className="name">
            <p>{user.name}</p>
            <Link to={user.id} id={user.id}>
            <span>{user.bio}</span></Link>
            </div>
          </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
