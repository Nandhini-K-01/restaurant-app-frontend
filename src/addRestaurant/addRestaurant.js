import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import "./addRestaurant.css";
import { Button } from "@mui/material";
import jwt from "jsonwebtoken";
import { fontStyle } from "@mui/system";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  //   const [dish, setDish] = useState([]);
  //   const [price, setPrice] = useState([]);
  //   const [menu, setMenu] = useState({});

  const navigate = useNavigate();

  const handleQuill = (value) => {
    setDesc(value);
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    console.log(name);
    const decodedtoken = jwt.decode(localStorage.getItem("token"));
    if (decodedtoken.exp * 1000 < Date.now()) {
      navigate("/");
    }
    if (
      name === "" ||
      desc === "" ||
      phone === "" ||
      address === "" ||
      image === "" ||
      city === ""
    ) {
      setError("Required field missing. Kindly check and add.");
      console.log(error);
    } else {
      const res = await axios
        .post(
          "http://localhost:4000/restaurant/create",
          {
            name: name,
            description: desc,
            address: address,
            city: city,
            contact: phone,
            image: image,
          },
          {
            headers: { accesstoken: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          alert("Restaurant has been added sucessfully");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="add-restaurant">
      <div className="add-restaurant-container">
        <div className="head-title">
          <h1 style={{ color: "gold" }}>ADD A RESTAURANT</h1>
        </div>
        <div className="restaurant-container">
          <div className="restaurant-options">
            <div className="restaurant-option">
              <div className="title">
                <h4>Restaurant Name</h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Add restaurant name"
                ></input>
              </div>
            </div>
            <div className="restaurant-option">
              <div className="title">
                <h4>Description</h4>
                <small>
                  Include all the information someone would need to know about
                  your restaurant
                </small>
                <ReactQuill
                  value={desc}
                  onChange={handleQuill}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="title">
              <h4>Image Url</h4>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Upload the restaurant image in url format only"
              ></input>
            </div>
                        {/* <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">Dish</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Menu item"/>
                </div>
                <div class="form-group col-md-6">
                <label for="inputPassword4">Price</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Price"/>
                </div> */}
            <div className="title">
              <h4>Address</h4>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Add address details"
              ></input>
            </div>
            <div className="title">
              <h4>City</h4>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter the city name"
              ></input>
            </div>
            <div className="title">
              <h4>Contact</h4>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter the phone number"
              ></input>
            </div>
            {error !== "" && (
              <p style={{ color: "red", fontSize: "16px", marginLeft: "18px" }}>
                {error}
              </p>
            )}
            {/* <div className="restaurant-option">
                           <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Add upto 5 tags to describe what your restaurant is about
                                </small>
                                
                            </div>
                        </div>        */}
          </div>
        </div>
        <br />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="button"
          variant="contained"
        >
          Add Restaurant
        </Button>
      </div>
    </div>
  );
}

export default AddRestaurant;
