import styled from "styled-components";
import imgURL from "../img/cherries.jpg"
import { useEffect } from "react";
import AccountBox from "./accountBox";

const AppContainer = styled.div`
  width: 100%;
  height: 756px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${imgURL});
`;

export default function Home() {
  useEffect(() => sessionStorage.getItem("user") && sessionStorage.removeItem("user"), [])

  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}