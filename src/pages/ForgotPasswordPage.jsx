import { useState } from "react";
import React from "react";

import { useAuth } from "../contexts/AuthContext";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const { forgotPassword } = useAuth();

  return (
    <>
      <div className="bodyRegister">
        <div className="containerDi">
          <Link to="/login">
            <label
              htmlFor="show"
              className="close-btn fas fa-times"
              title="close"
            ></label>
          </Link>

          <div className="text">Forgot password</div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await forgotPassword(email);
                Toastify({
                  text: "success! check your email",

                  style: {
                    background: "linear-gradient(to right, lightgreen, green)",
                  },
                }).showToast();
              } catch (error) {
                console.log(error.message);
                Toastify({
                  text: error.message,
                  className: "error",
                  style: {
                    background:
                      "linear-gradient(to right, rgb(71, 22, 22), red)",
                  },
                }).showToast();
              }
            }}
          >
            <div className="data">
              <label>Email or Phone</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </div>

            <div className="btn">
              <div className="inner"></div>

              <button type="submit">submit</button>
            </div>
            <span className="or">or</span>

            <div className="btn">
              <div className="inner"></div>
              <Link to="/login">
                <button type="submit">login</button>
              </Link>
            </div>
          </form>

          {/*  end of the form */}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
