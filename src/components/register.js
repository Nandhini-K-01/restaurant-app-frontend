import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing.");
      // } else (!validateEmail(email))
      //   setError("Email is malformed");
      //   setLoading(false);
    }
    try {
      var response = await axios.post("https://simplerestaurant.onrender.com/register/signup", {
        Username: username,
        email: email,
        password: password,
      });
      console.log(response);
      if (response.data) {
        setUsername(" ");
        setEmail(" ");
        setPassword("");
        alert("Your account has been created successfully!!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/")
  };

  return (
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image">
              <img
                style={{ height: "620px", width: "500px" }}
                src="https://assets.gqindia.com/photos/5cdc74897813c415f22fc949/master/pass/cafe-mozaic.png"
              ></img>
            </div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form class="user">
                  <div class="form-group row">
                    <div class="col-sm-12 mb-3 mb-sm-0">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {/* <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="Last Name"/>
                                    </div> */}
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-12 mb-3 mb-sm-0">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error !== "" && (
                      <p style={{ color: "red", fontSize: "16px" , marginLeft:"18px"}}>{error}</p>
                    )}
                    {/* <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                    </div> */}
                  </div>
                  <a
                    class="btn btn-primary btn-user btn-block"
                    onClick={handleRegister}
                  >
                    Register Account
                  </a>
                  <hr />
                  <a class="btn btn-google btn-user btn-block">
                    <i class="fab fa-google fa-fw"></i> Register with Google
                  </a>
                  <a class="btn btn-facebook btn-user btn-block">
                    <i class="fab fa-facebook-f fa-fw"></i> Register with
                    Facebook
                  </a>
                </form>
                <hr />
                {/* <div class="text-center">
                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                            </div> */}
                <div class="text-center">
                  <Link class="small" to="/signin">
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
