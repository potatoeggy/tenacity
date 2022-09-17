import styled from "styled-components";
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
