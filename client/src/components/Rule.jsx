import { Link } from "react-router-dom";
import styled from "styled-components";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PolicyIcon from "@material-ui/icons/Policy";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import WorkIcon from "@material-ui/icons/Work";

export default function Rule({ rule }) {
  return (
    <StyledRule>
      <div className="topRule">
        {rule.title === "EMS" ? <LocalHospitalIcon className="iconRule" /> : ""}
        {rule.title === "police" ? <PolicyIcon className="iconRule" /> : ""}
        {rule.title === "bank rob" ? (
          <AccountBalanceIcon className="iconRule" />
        ) : (
          ""
        )}
        {rule.title === "gang" ? <SmokingRoomsIcon className="iconRule" /> : ""}
        {rule.title === "entreprise" ? <WorkIcon className="iconRule" /> : ""}
      </div>
      <div className="midRule">
        <h2>{rule.title}</h2>
      </div>
      <div className="bottomRule">
        <Link to={"/rules/" + rule.title} className="cancel">
          read more...
        </Link>
      </div>
    </StyledRule>
  );
}
const StyledRule = styled.div`
  height: 300px;
  width: 300px;
  background-color: var(--transparent);
  padding: 20px 0;
  .topRule {
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconRule {
      font-size: 7rem;
      color: var(--strong-font-color);
    }
  }
  .midRule {
    height: 30%;
    h2 {
      font-style: italic;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      color: var(--primairy-color);
      text-align: center;
      font-size: 1.8rem;
    }
    p {
      padding: 15px;
      text-align: center;
    }
  }
  .bottomRule {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    a {
      :hover {
        color: var(--blue-color);
      }
    }
  }
`;
