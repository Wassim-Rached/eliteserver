import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/UserAction";
import { useState } from "react";
import { Redirect } from "react-router";
import { CircularProgress } from "@material-ui/core";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const info = userRegister.userInfo;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  if (!userInfo) {
    return (
      <StyledRegisterScreen>
        <div className="titlePage">Register</div>
        <p className="errorMsg">{alert}</p>
        <p className="errorMsg">{info && info.message ? info.message : ""}</p>
        <form className="form" onSubmit={submitHandler}>
          <label htmlFor="">name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
            required
          />
          <label htmlFor="">email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email..."
            required
          />
          <label htmlFor="">password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password..."
            required
            min="6"
          />
          <label htmlFor="">confirm password:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password..."
            required
            min="6"
          />
          <button type="submit" className="signIn">
            {loading ? <CircularProgress className="charging" /> : "Register"}
          </button>
        </form>
      </StyledRegisterScreen>
    );
  } else {
    return <Redirect to="/" />;
  }
}
const StyledRegisterScreen = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  button {
    margin-top: 20px;
  }
`;
