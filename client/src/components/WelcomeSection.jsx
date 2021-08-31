import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WelcomeSection() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <WelcomeSectionStyled>
      {userInfo ? (
        <h1>
          welcome back
          <span> {userInfo.name}</span>
        </h1>
      ) : (
        <>
          <h1>
            welcome to <span>Elite</span> server website!
          </h1>
          <p>register now to unlock features and more.. </p>
          <Link to="/register" className="btn">
            Register
          </Link>
        </>
      )}
    </WelcomeSectionStyled>
  );
}
const WelcomeSectionStyled = styled.section`
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  padding: 10px;
  h1 {
    line-height: 7rem;
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--strong-font-color);
    text-transform: capitalize;
    @media screen and (max-width: 700px) {
      font-size: 2rem;
    }
    span {
      font-style: italic;
      color: var(--primairy-color);
    }
  }
  .btn {
    margin: 20px auto 0;
    cursor: pointer;
    padding: 8px;
    width: 300px;
    color: #fff;
    background-color: var(--blue-color);
  }
  p {
    span {
      color: var(--blue-color);
    }
  }
`;
