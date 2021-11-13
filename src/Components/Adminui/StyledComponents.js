import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  padding-top: 90px;
  @media screen and (max-width: 567px) {
    padding-top: 30px;
  }
`;

export const LoadingViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AdminTableHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  font-family: "Roboto";
  color: #556f78;
  margin-top: 20px;
  margin-bottom: 20px;
`;
