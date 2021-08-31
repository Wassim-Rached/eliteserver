import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { AddNewNews } from "../actions/NewsAction";

export default function UploadNewsScreen() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("newsImage", fileName);
    try {
      dispatch(AddNewNews(formData, config));
      setMsg("new news has been created");
    } catch (error) {
      setMsg(error);
    }
  };
  if (userInfo) {
    return (
      <StyledUploadNewsScreen>
        <div className="titlePage">upload news</div>
        <p>{msg}</p>
        <form
          className="form"
          onSubmit={changeOnClick}
          encType="multipart/form-data"
        >
          <label htmlFor="">Title:</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="title..."
            required
          />
          <label htmlFor="">Description:</label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="description..."
            required
          />
          <label htmlFor="file">Image:</label>
          <input
            filename="profileImg"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            name="photo"
            onChange={onChangeFile}
          />
          <button className="signIn">Post</button>
        </form>
      </StyledUploadNewsScreen>
    );
  } else {
    return <Redirect to="/" />;
  }
}
const StyledUploadNewsScreen = styled.main`
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
