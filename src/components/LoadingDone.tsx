import styled from "styled-components";
import data from "../data/test.json";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function LoadingDone() {
  return (
    <Container>
      <div></div>
    </Container>
  );
}
