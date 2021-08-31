import styled from "styled-components";

export default function DiscordSection() {
  return (
    <DiscordSectionStyled id="Discord">
      <img src="./images/fixed/discordCapture.png" alt="" />
      <div className="text">
        <h1>Join Our Discord community!</h1>
        <p></p>
        <div className="img">
          <a
            href="https://discord.gg/sEYGbvexnn"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./images/fixed/join_discord.png" alt="" />
          </a>
        </div>
      </div>
    </DiscordSectionStyled>
  );
}
const DiscordSectionStyled = styled.section`
  max-width: 100vw;
  min-width: var(--min-width);
  margin: 0;
  background-color: var(--secondary-bg);
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 25px;
  img {
    max-width: 90vw;
    max-height: 60vh;
  }
  .text {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h1 {
      text-transform: capitalize;
      font-size: 1.8rem;
      color: var(--strong-font-color);
      margin-bottom: 15px;
    }
    p {
      color: var(--light-font-color);
      padding-left: 15px;
    }
    .img {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
