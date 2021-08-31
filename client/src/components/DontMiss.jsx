import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/UserAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";

export default function DontMiss() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="top">
      <h1>Don't Miss Out!</h1>
      <p className="now">
        Register now and unlock features, abilites and More!
      </p>
      <p className="errorMsg">{alert}</p>
      <p className="errorMsg">
        {userInfo && userInfo.message ? userInfo.message : ""}
      </p>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="username">username:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
            required
          />
        </div>
        <div className="input">
          <label htmlFor="email">email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email..."
            required
          />
        </div>
        <div className="input">
          <label htmlFor="passowrd">passowrd:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password..."
            required
            min="6"
          />
        </div>
        <div className="input">
          <label htmlFor="confirm">confirm passowrd:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password..."
            required
            min="6"
          />
        </div>
        <div className="btncont">
          <button type="submit">
            {loading ? <CircularProgress className="charging" /> : "Register"}
          </button>
        </div>
      </form>
      <p className="dont">
        Already have an account? <Link to="/signin">SignIn</Link>
      </p>
    </div>
  );
}
