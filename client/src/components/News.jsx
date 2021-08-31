import { Link } from "react-router-dom";
import styled from "styled-components";
export default function News({
  image,
  title,
  description,
  posterImg,
  posterId,
  posterName,
}) {
  return (
    <StyledNews>
      <>
        <div className="topNews">
          <img
            src={process.env.REACT_APP_IMAGES_URL + posterImg}
            alt="posterImg"
          />
          <p>
            <span>
              <Link to={"/profile/" + posterId}>{posterName}</Link>
            </span>
          </p>
        </div>
        <div className="middleNews">
          <img
            src={process.env.REACT_APP_IMAGES_URL + "news/" + image}
            alt="newsImg"
          />
        </div>
        <div className="bottomNews">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </>
    </StyledNews>
  );
}
const StyledNews = styled.div`
  transition: all ease-out 0.2s;
  overflow: hidden;
  height: 400px;
  background-color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 280px;
  @media screen and (min-width: 700px) {
    max-width: 300px;
  }
  padding: 10px;
  border-radius: 7px;
  gap: 10px;
  .topNews {
    max-height: 30px;
    height: 100%;
    gap: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      border-radius: 50%;
      width: 100%;
      max-width: 30px;
      max-height: 30px;
      cursor: Pointer;
    }
    p {
      color: var(--strong-font-color);
      width: 240px;
      span {
        cursor: Pointer;
        color: #be2b2b;
      }
    }
  }
  .middleNews {
    max-height: 180px;
    display: flex;
    margin: 10px 0;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      max-height: 180px;
    }
  }
  .bottomNews {
    max-height: 150px;
    height: 100%;
    h3 {
      cursor: pointer;
      font-weight: 400;
      color: var(--primairy-color);
    }
    p {
      color: #959595;
      padding-left: 15px;
    }
  }
  :hover {
    transform: translatey(-15px);
    .bottom {
      p {
        color: #fff;
      }
    }
  }
`;
