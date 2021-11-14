import styled from "styled-components";

export const SuccessViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  padding-bottom: 90px;
  @media screen and (max-width: 567px) {
    padding-bottom: 30px;
  }
`;
export const DeleteAndSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 30px;
  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`;
export const SearchElement = styled.input`
  width: 70%;
  height: 35px;
  outline: none;
`;
export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const ColumnTitles = styled.thead`
  width: 100%;
`;
export const Row = styled.tr`
  width: 100%;
`;
export const TitleHeading = styled.th`
  padding: 8px;
  border: 1px solid #ffff;
  text-align: left;
  width: 20%;
`;
export const TableBody = styled.tbody``;
export const CheckBox = styled.input`
  width: 22px;
  margin-left: 18px;
`;

export const DeleteSelectedButton = styled.button`
  background-color: #967c7a;
  padding: 5px 15px 5px 15px;
  color: #ffffff;
  font-size: 12px;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 7px;
  height: 35px;
  @media screen and (max-width: 576px) {
    margin-bottom: 20px;
  }
`;
