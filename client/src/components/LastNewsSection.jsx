import styled from "styled-components";
import News from "./News";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNews } from "../actions/NewsAction";

export default function LastNewsSection() {
  const dispatch = useDispatch();
  const getAllNews = useSelector((state) => state.getAllNews);
  const { allNews } = getAllNews;
  const [size, setSize] = useState(3);
  useEffect(() => {
    dispatch(GetAllNews(size));
  }, [dispatch, size]);
  return (
    <LastNewsSectionStyled id="LastNews">
      <div className="containerSectionSmall">
        <h1 className="title">Last News!</h1>
        <div className="NewsContainer">
          {!allNews
            ? "loading"
            : allNews.map((news) => {
                return (
                  <News
                    key={news._id}
                    image={news.image}
                    title={news.title}
                    description={news.description}
                    posterName={news.posterName}
                    posterImg={news.posterImg}
                    posterId={news.posterId}
                  />
                );
              })}
        </div>
        <div className="seeMore">
          <span onClick={() => setSize(size + 3)}>See More</span>
          {size > 3 ? <span onClick={() => setSize(3)}>See Less</span> : ""}
        </div>
      </div>
    </LastNewsSectionStyled>
  );
}
const LastNewsSectionStyled = styled.section`
  margin: 0 auto;
  min-width: var(--min-width);
  background-color: var(--secondary-bg);
  .title {
    font-size: 2rem;
    color: var(--blue-color);
    text-align: center;
    margin-bottom: 40px;
  }
  .NewsContainer {
    margin: 0 auto;
    gap: 30px;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    max-width: 1200px;
  }
  .seeMore {
    text-align: center;
    padding: 30px 0;
    span {
      cursor: pointer;
      :hover {
        color: var(--primairy-color);
      }
      margin-left: 15px;
    }
  }
`;
