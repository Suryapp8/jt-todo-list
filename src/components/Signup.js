import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

export default function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exist");
          } else if (res.data === "notexist") {
            history("/", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  //the below code will validate the password  that the:
  //  1. A password is considered strong if the below conditions
  // are all met:
  // ● It has at least 6 characters and at most 20 characters.
  // ● It contains at least one lowercase letter, at least one
  // uppercase letter, and at least one digit.
  // ● It does not contain three repeating characters in a row



  return (
    <>
      <div className="signup">
        <h1>Sign up</h1>
        <form method="POST">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter Password"
          />
          <br />
          <button className="btn" onClick={submit}>
            Sign up
          </button>
        </form>

        <br />
        <p>Already have an account?</p>
        <Link className="link-login" to="/">
          Log In
        </Link>
      </div>
    </>
  );
}
