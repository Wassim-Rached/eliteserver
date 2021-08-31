import styled from "styled-components";
import Rule from "../components/Rule";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRules } from "../actions/RulesAction";
import { useEffect } from "react";

export default function RulesScreen() {
  const dispatch = useDispatch();

  const getAllRules = useSelector((state) => state.getAllRules);
  const { getRules } = getAllRules;

  useEffect(() => {
    dispatch(GetAllRules());
  }, [dispatch]);

  return (
    <StyledRulesScreen>
      {getRules ? (
        <div className="containerRules">
          {getRules.map((rule) => {
            return <Rule key={rule._id} rule={rule} />;
          })}
        </div>
      ) : (
        "loading"
      )}
    </StyledRulesScreen>
  );
}

const StyledRulesScreen = styled.main`
  padding-top: 58px;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  .containerRules {
    margin: 0 auto;
    padding: 30px 0;
    max-width: 960px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
  }
`;
