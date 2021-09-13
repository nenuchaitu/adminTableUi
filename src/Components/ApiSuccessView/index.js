import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

import UserListItem from "../UserListItem";

import {
  SuccessViewContainer,
  SearchElement,
  ColumnTitles,
  TitleHeading,
  CheckBox,
  Row,
  Table,
} from "./StyledComponents";

const ApiSuccessView = (props) => {
  const [active, setActive] = useState(1);
  const [isChecked, SetIsChecked] = useState(false);
  const offset = 10;
  const { usersList } = props;
  const [filteredList, setFilteredList] = useState(usersList);

  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(event) => {
          const value = parseInt(event.target.textContent[0]);
          setActive(value);
          SetIsChecked(false);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <br />
      <Pagination size="lg">{items}</Pagination>
      <br />
    </div>
  );

  const renderColumnTitle = () => (
    <>
      <ColumnTitles>
        <Row>
          <TitleHeading>
            <CheckBox
              type="checkbox"
              onChange={() => {
                SetIsChecked(!isChecked);
              }}
            />
          </TitleHeading>
          <TitleHeading>Name</TitleHeading>
          <TitleHeading>Email</TitleHeading>
          <TitleHeading>Role</TitleHeading>
          <TitleHeading>Actions</TitleHeading>
        </Row>
      </ColumnTitles>
    </>
  );

  const searchUserItem = (event) => {
    const searchInput = event.target.value.toLowerCase();
    let resultList = usersList.filter((user) => {
      if (
        user.name.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput) ||
        user.role.toLowerCase().includes(searchInput)
      ) {
        return user;
      }
    });
    setFilteredList(resultList);
  };

  const deleteUserFromUi = (id) => {
    const updatedList = filteredList.filter((user) => user.id !== id);
    setFilteredList(updatedList);
  };

  return (
    <SuccessViewContainer>
      <SearchElement
        type="search"
        placeholder="Search by email,name or role"
        onChange={searchUserItem}
      />
      <Table>
        {renderColumnTitle()}
        {filteredList.map((user) => {
          const upperLimit = active * 10;
          const lowerLimit = upperLimit - offset;
          if (
            parseInt(user.id) <= upperLimit &&
            parseInt(user.id) > lowerLimit
          ) {
            return (
              <UserListItem
                key={user.id}
                user={user}
                isChecked={isChecked}
                deleteUserFromUi={deleteUserFromUi}
              />
            );
          } else {
            return null;
          }
        })}
      </Table>
      {paginationBasic}
    </SuccessViewContainer>
  );
};

export default ApiSuccessView;
