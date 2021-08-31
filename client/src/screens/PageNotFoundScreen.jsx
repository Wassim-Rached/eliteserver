import styled from "styled-components";
import ErrorIcon from "@material-ui/icons/Error";
export default function PageNotFoundScreen() {
  return (
    <StyledPageNotFoundScreen>
      <ErrorIcon className="iconError" />
      <p>PAGE NOT FOUND!</p>
    </StyledPageNotFoundScreen>
  );
}

const StyledPageNotFoundScreen = styled.main`
  min-height: 100vh;
  padding-top: 200px;
  text-align: center;
  background-color: var(--transparent);
  p {
    font-size: 3.4rem;
    color: var(--primairy-color);
  }
  .iconError {
    font-size: 6rem;
    /* color: var(--danger); */
  }
`;
