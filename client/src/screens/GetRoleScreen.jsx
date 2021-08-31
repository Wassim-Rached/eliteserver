import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GetRoleByCode } from "../actions/UserAction";
import { Redirect } from "react-router";
import { CircularProgress } from "@material-ui/core";

export default function GetRoleScreen() {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const getRole = useSelector((state) => state.getRole);
  const { loading, RoleMessage } = getRole;
  const token = "bearer " + userInfo.token;
  const config = {
    headers: { authorization: token },
  };
  const submithandler = (e) => {
    e.preventDefault();
    console.log(code);
    dispatch(GetRoleByCode({ code: code }, config));
  };
  if (userInfo) {
    return (
      <StyledGetRoleScreen>
        <div className="titlePage">Get Role</div>
        <p>{RoleMessage}</p>
        <form className="form" onSubmit={submithandler}>
          <label htmlFor="">GetRoleCode:</label>
          <input
            type="text"
            placeholder="getRole Code..."
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <p>
            if you have a getRole code you can use it here and get your role!
          </p>
          <button type="submit" className="getRole">
            {!loading ? "Sumbit" : <CircularProgress className="charging" />}
          </button>
        </form>
      </StyledGetRoleScreen>
    );
  } else {
    return <Redirect to="/" />;
  }
}

const StyledGetRoleScreen = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 58px;
  p {
    height: 30px;
  }
  form {
    margin-top: 20px;
    gap: 15px;
    justify-content: flex-start;
    align-items: center;
    label {
      text-align: center;
    }
    p {
      max-width: 80%;
      text-align: center;
      margin-bottom: 15px;
      color: var(--light-font-color);
    }
  }
`;
