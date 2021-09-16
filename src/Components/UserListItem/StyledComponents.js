import styled from "styled-components";

export const Row = styled.tr`
  width: 100%;
  background-color: ${(props) =>
    props.contentEditable === true ? "#D3D3D3" : "#ffff"};
  outline: none;
`;

export const TableValue = styled.td`
  padding: 8px;
  border: 1px solid #fff;
  text-align: left;
  width: 20%;
`;
export const CheckBox = styled.input`
  width: 12px;
  height: 12px;
  margin-left: 20px;
`;
export const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
`;
