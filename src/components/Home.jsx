import styled from "styled-components";
import AccountBox from "./accountBox";
import imgURL from "../img/cherries.jpg"

const AppContainer = styled.div`
  background-image:url(${imgURL});
  background-size:cover;
  background-position:center;
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

export default function Home() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}