import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError();
    if (email === "" || password === "") {
      setError("Required field is missing");
      // } else (!validateEmail(email))
      //   setError("Email is malformed");
      //   setLoading(false);
    }
    try {
      var response = await axios.post("https://simplerestaurant.onrender.com/register/signin", {
        email: email,
        password: password,
      });
      if (response.data) {
        await localStorage.setItem("token", response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container">
      {/* <!-- Outer Row --> */}
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image">
                  <img
                    style={{ height: "595px", width: "500px" }}
                    src="https://assets.gqindia.com/photos/5cdc74897813c415f22fc949/master/pass/cafe-mozaic.png"
                  ></img>
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form class="user">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
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
                        <p style={{ color: "red", fontSize: "16px" }}>
                          {error}
                        </p>
                      )}
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck"
                          />
                          <label class="custom-control-label" for="customCheck">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        class="btn btn-primary btn-user btn-block"
                        onClick={handleSignIn}
                      >
                        Login
                      </Link>
                      <hr />
                      <a
                        href="index.html"
                        class="btn btn-google btn-user btn-block"
                      >
                        <i class="fab fa-google fa-fw"></i> Login with Google
                      </a>
                      <a
                        href="index.html"
                        class="btn btn-facebook btn-user btn-block"
                      >
                        <i class="fab fa-facebook-f fa-fw"></i> Login with
                        Facebook
                      </a>
                    </form>
                    <hr />
                    {/* <div class="text-center">
                                        <a class="small" href="forgot-password.html">?</a>
                                    </div> */}
                    <div class="text-center">
                      <Link class="small" to="/signup">
                        Don't have an account? Create One!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
