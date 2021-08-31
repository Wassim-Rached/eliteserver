import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UpdateUserById } from "../actions/UserAction";
import { CircularProgress } from "@material-ui/core";
export default function UpdateAccountScreen() {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const updateUser = useSelector((state) => state.updateUser);
  const { updatedUser, loading } = updateUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const token = "bearer " + userInfo.token;
  //check if user is connected

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnClick = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "content-type": "multipart/form-data", authorization: token },
    };
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImg", fileName);

    if (password === confirmPassword) {
      dispatch(UpdateUserById(formData, config));
      setMsg("");
    } else {
      setMsg("passwords dosnt match");
    }
  };
  if (userInfo) {
    return (
      <StyledUpdateAccountScreen>
        <div className="titlePage">Update account</div>
        <p className="error">{loading ? "loading" : msg}</p>
        <p className="error">{updatedUser ? updatedUser.message : ""}</p>
        <p className="error">
          {!msg && updatedUser && !updatedUser.message
            ? "account has been updated!"
            : ""}
        </p>
        <form
          className="form"
          onSubmit={changeOnClick}
          encType="multipart/form-data"
        >
          <label htmlFor="name"> name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={userInfo ? userInfo.name : ""}
            maxLength="20"
            minLength="2"
          />
          <label htmlFor="email"> email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={userInfo ? userInfo.email : ""}
            maxLength="40"
            minLength="10"
          />
          <label htmlFor="Password"> Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="enter your old or new password..."
            maxLength="40"
            minLength="6"
            required
          />

          <label htmlFor="confirmPassword">confirm Password:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="enter your confirm Password..."
            maxLength="40"
            minLength="6"
            required
          />
          <label htmlFor="file">choose profile image:</label>
          <input
            filename="profileImg"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            name="photo"
            onChange={onChangeFile}
          />
          <button className="update" type="submit">
            {loading ? <CircularProgress className="charging" /> : "save"}
          </button>
        </form>
      </StyledUpdateAccountScreen>
    );
  } else {
    return <Redirect to="/" />;
  }
}
const StyledUpdateAccountScreen = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  padding-top: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
