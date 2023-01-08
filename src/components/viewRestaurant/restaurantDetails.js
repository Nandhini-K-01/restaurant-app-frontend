import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { StarRounded } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ReactHtmlParser from "react-html-parser";
import { Rating } from "@mui/material";
import Stack from "@mui/material";

function RestaurantDetails() {
  const resid = useParams();
  const navigate = useNavigate();
  const [resDetails, setResDetails] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getRestaurant() {
      const decodedtoken = jwt.decode(localStorage.getItem("token"));
      if (decodedtoken.exp * 1000 < Date.now()) {
        navigate("/");
      } else {
        const res = await axios
          .get(`https://simplerestaurant.onrender.com/restaurant/get/${resid.id}`, {
            headers: { accesstoken: localStorage.getItem("token") },
          })
          .then((res) => {
            console.log(res.data);
            setResDetails(res.data);
            setDishes(Object.entries(res.data.dishes[0]));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    getRestaurant();
  }, []);
  //  console.log(resDetails)
  //  console.log(dishes)

  return (
    <div
      style={{ marginLeft: "250px", marginRight: "250px", marginTop: "50px" }}
    >
      <div class="card mb-3">
        <img class="card-img-top" src={resDetails.image} alt="Card image cap" />
        {/* <div class="card text-center"> */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="ABOUT" value="1" />
                <Tab label="MENU" value="2" />
                <Tab label="REVIEWS" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <strong style={{ color: "#4e73df" }}>
                {resDetails.name}
                <br />
                <div style={{ color: "gold", display: "inline-block" }}>
                  <StarRounded />
                  <strong style={{ color: "black" }}>
                    {resDetails.rating === undefined
                      ? ""
                      : `${resDetails.rating} / 5`}
                  </strong>
                  <span style={{ color: "green" }}>
                    |  {" "}
                    {resDetails.reviews === undefined
                      ? "No reviews yet"
                      : `${resDetails.reviews} reviews`}
                  </span>
                </div>
              </strong>
              <br />
              <br />
              {ReactHtmlParser(resDetails.description)}
              <br />
              <br />
              <div style={{ color: "chocolate", fontFamily: "sans-serif" }}>
                <LocationOnIcon></LocationOnIcon>
              </div>
              <div style={{ fontStyle: "normal", color: "blue" }}>
                {resDetails.address},<br />
                {resDetails.city}.
              </div>
              <div style={{ color: "chocolate", fontFamily: "sans-serif" }}>
                <LocalPhoneIcon />
              </div>
              <div style={{ fontStyle: "normal", color: "blue" }}>
                {resDetails.contact}
              </div>
            </TabPanel>
            <TabPanel value="2">
              {dishes.map((dish) => (
                <ul
                  class="list-group"
                  style={{ maxWidth: "75%", marginLeft: "120px" }}
                >
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {dish[0]}
                    <span class="badge badge-primary badge-pill">
                      ₹ {dish[1]}
                    </span>
                  </li>
                </ul>
              ))}
            </TabPanel>
            <TabPanel value="3">
              <strong style={{ fontWeight: "bold", color: "black" }}>
                {resDetails.name} Rating & Review
              </strong>
              <br />
              <div style={{ color: "gold", display: "inline-block" }}>
                <StarRounded />
                <strong style={{ color: "black" }}>
                  {resDetails.rating === undefined
                    ? ""
                    : `${resDetails.rating} / 5`}
                </strong>
                <br />
                <span style={{ color: "green", marginLeft: "25px" }}>
                  {resDetails.reviews === undefined
                    ? "No reviews yet"
                    : `${resDetails.reviews} reviews`}
                </span>
              </div>
              <br />
              <br />
              {resDetails.rating ? (
                <>
                  <div class="progress" style={{ blockSize: "width:200px" }}>
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "85%" }}
                    >
                      Hygiene
                    </div>
                  </div>
                  <br />
                  <div class="progress" style={{ blockSize: "width:200px" }}>
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "70%" }}
                    >
                      Pricing
                    </div>
                  </div>
                  <br />
                  <div class="progress" style={{ blockSize: "width:200px" }}>
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "90%" }}
                    >
                      Service
                    </div>
                  </div>
                  <br />
                  <div class="progress" style={{ blockSize: "width:200px" }}>
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "60%" }}
                    >
                      Ambience
                    </div>
                  </div>
                  <br />
                </>
              ) : (
                <></>
              )}

              <div style={{ fontWeight: "bold", color: "black" }}>
                Your Rating
              </div>
              <Rating name="size-large" defaultValue={0} size="large" />
            </TabPanel>
          </TabContext>
        </Box>
        {/* <div class="card-body">
                 <h5 class="card-title">{resDetails.name}</h5>
                 <p class="card-text"></p>
                 <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
             </div> */}
      </div>
    </div>
    //  </div>
  );
}

export default RestaurantDetails;
