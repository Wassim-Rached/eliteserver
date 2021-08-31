import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/UserAction";
import { useState } from "react";
import { Redirect } from "react-router";
import { CircularProgress } from "@material-ui/core";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  if (!userInfo) {
    return (
      <StyledSignInScreen>
        <div className="titlePage">Signin</div>
        <p class="errorMsg">{error}</p>
        <form className="form" onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
            min="6"
          ></input>
          <button type="submit" className="signIn">
            {loading ? <CircularProgress className="charging" /> : "Signin"}
          </button>
        </form>
      </StyledSignInScreen>
    );
  } else {
    return <Redirect to="/" />;
  }
}
const StyledSignInScreen = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;
