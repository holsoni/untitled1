import styled from "styled-components";

const SideBarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: rgb(255 255 255 / 65%);
`;

const KeyboardContainer = styled.div`
  border-radius: 5px;
  width: max-content;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin: auto;
  background-color: white;
`;

const CustomP = styled.p`
  margin: 20px auto;
  width: max-content;
`;

export { SideBarContainer, KeyboardContainer, CustomP };
