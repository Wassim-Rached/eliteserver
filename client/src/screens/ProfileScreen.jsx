import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteUserById, GetUserById } from "../actions/UserAction";
import { useEffect, useState } from "react";

//icons
import WarningIcon from "@material-ui/icons/Warning";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

//components

export default function ProfileScreen() {
  let { userId } = useParams();
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();

  const GetUser = useSelector((state) => state.GetUser);
  const { getUser } = GetUser;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const deleteUser = useSelector((state) => state.deleteUser);
  const { loading } = deleteUser;

  useEffect(() => {
    dispatch(GetUserById(userId));
  }, [dispatch, userId]);

  const token = `bearer ${userInfo ? userInfo.token : ""}`;
  const config = {
    headers: { authorization: token },
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(DeleteUserById(userId, config));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledProfileScreen>
      {warning ? (
        <StyledAreYouSure>
          <div className="containerSure">
            <WarningIcon className="icon" />
            <p>are you sure you want to delete your account?</p>
            <div onClick={() => setWarning(false)} className="cancel">
              cancel
              <CancelIcon />
            </div>
            <Link to="/" onClick={deleteHandler} className="delete">
              {loading ? <CircularProgress className="charging" /> : "delete"}
              <DeleteIcon />
            </Link>
          </div>
        </StyledAreYouSure>
      ) : (
        ""
      )}
      <div className="topProfile">
        {!getUser ? (
          "loading"
        ) : (
          <>
            <img
              src={
                process.env.REACT_APP_IMAGES_URL + getUser.profileImg ||
                process.env.REACT_APP_IMAGES_URL + "defaultProfileImg.jpg"
              }
              alt={getUser.name}
            />
            <p className="isAdmin">{getUser.name}</p>
          </>
        )}
      </div>
      {userInfo && userId === userInfo._id ? (
        <div className="bottomProfile">
          <div className="containerProfile">
            <Link className="update" to={"/profile/update"}>
              Update Account
              <EditIcon />
            </Link>
            {userInfo && userInfo.isAdmin ? (
              <NavLink to="/admin/uploadNews" className="cancel">
                add news
                <AnnouncementIcon />
              </NavLink>
            ) : (
              <Link className="getRole" to={`/profile/getRole/` + userInfo._id}>
                Get Role
                <SupervisorAccountIcon />
              </Link>
            )}
            <div onClick={() => setWarning(true)} className="delete">
              Delete Account
              <DeleteIcon />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </StyledProfileScreen>
  );
}
const StyledProfileScreen = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 58px;
  .topProfile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
    height: 50vh;
    width: 100%;
    background-color: var(--transparent);
    position: relative;
    p {
      color: var(--primairy-color);
      font-size: 1.3rem;
      font-weight: 400;
      font-style: italic;
      text-transform: uppercase;
    }
    img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
    }
  }
  .bottomProfile {
    padding-top: 20px;
    width: 100%;
    height: 50vh;
    .containerProfile {
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
      display: flex;
      justify-content: center;
      > * {
        margin: 0 15px;
      }
    }
  }
`;
const StyledAreYouSure = styled.div`
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0000008d;
  display: flex;
  justify-content: center;
  align-items: center;
  .containerSure {
    text-align: center;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 320px;
    height: 320px;
    background-color: #575757;
    color: #fff;
    .icon {
      color: var(--danger);
      font-size: 7rem;
    }
  }
`;
