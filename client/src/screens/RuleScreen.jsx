import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";
import { GetRuleById } from "../actions/RulesAction";
import { useDispatch, useSelector } from "react-redux";

export default function RuleScreen() {
  const dispatch = useDispatch();
  const { ruleTitle } = useParams();
  const [language, setLanguage] = useState("TN");

  const getRulebyId = useSelector((state) => state.getRulebyId);
  const { getRule } = getRulebyId;

  useEffect(() => {
    dispatch(GetRuleById(ruleTitle));
  }, [dispatch, ruleTitle]);

  return (
    <StyledRuleScreen>
      {getRule ? (
        <div className="containerRuleScreen">
          <div className="title">{getRule.message || getRule.title}</div>
          <div className="btns">
            <span
              onClick={() => {
                setLanguage("AR");
              }}
              className={language === "AR" ? " active" : ""}
            >
              AR
            </span>
            <span
              onClick={() => {
                setLanguage("TN");
              }}
              className={language === "TN" ? " active" : ""}
            >
              TN
            </span>
          </div>
          <p className="content">
            {language === "TN" ? getRule.tounes : getRule.arabic}
          </p>
          <Link to="/rules" className="cancel toBottom">
            <ArrowBackIcon /> Go back to Rules
          </Link>
        </div>
      ) : (
        "loading"
      )}
    </StyledRuleScreen>
  );
}

const StyledRuleScreen = styled.main`
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .containerRuleScreen {
    background-color: var(--transparent);
    padding: 12px 12px 60px 12px;
    height: 100%;
    max-width: var(--max-width);
    min-height: 80vh;
    width: 100%;
    position: relative;
    .btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      span {
        cursor: pointer;
        padding: 8px 11px;
        background-color: grey;
      }
    }
    .title {
      text-align: center;
      color: var(--blue-color);
      letter-spacing: 0.2rem;
      font-style: italic;
      text-transform: capitalize;
      font-size: 3rem;
    }
    .content {
      line-height: 2.6rem;
      text-align: center;
      margin: 15px auto;
      max-width: 1100px;
    }
  }
  .toBottom {
    color: var(--primairy-color);
    position: absolute;
    bottom: 15px;
    width: 90%;
    left: 5%;
    right: 5%;
  }
`;
