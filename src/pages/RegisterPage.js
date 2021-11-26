import { useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";

export default function RegistePpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, signInWithGoogle } = useAuth();

  return (
    <>
      <div className="bodyRegister">
        <div className="containerDi">
          <Link to="/">
            <label
              htmlFor="show"
              className="close-btn fas fa-times"
              title="close"
            ></label>
          </Link>
          <div className="text">Sign Up </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!email || !password) {
              }
              setIsSubmitting(true);
              register(email, password)
                .then((response) => {
                  navigate("/");
                })
                .catch((error) => {
                  console.log(error.message);
                  Toastify({
                    text: error.message,
                    className: "error",
                    style: {
                      background:
                        "linear-gradient(to right, rgb(71, 22, 22), red)",
                    },
                  }).showToast();
                })
                .finally(() => setIsSubmitting(false));
            }}

            // action="#"
          >
            <div className="data">
              <label>Email</label>
              <input
                // value="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                // required
              />
            </div>
            <div className="data">
              <label>Write your password</label>
              <input
                // value="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
                // required
              />
            </div>

            <div className="forgot-pass"></div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit">sign up</button>
            </div>
            {/* google sign in  */}
            <div className="btn">
              <div className="inner"></div>
              <button
                onClick={() =>
                  signInWithGoogle()
                    .then((user) => {})
                    .catch((e) => console.log(e.message))
                }
              >
                <img
                  width="20px"
                  height="20px"
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt=""
                />
                <span className="span1">Login with Google</span>
              </button>
            </div>

            <div className="signup-link">
              Already a member? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
