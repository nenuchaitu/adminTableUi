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
  DeleteSelectedButton,
  TableBody,
  DeleteAndSearchInputContainer,
} from "./StyledComponents";

const ApiSuccessView = (props) => {
  const offset = 10;
  const { usersList } = props;
  const lastPage = Math.ceil(usersList.length / 10);
  const [active, setActive] = useState(1);
  const [isChecked, SetIsChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [filteredList, setFilteredList] = useState(usersList);

  const items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(event) => {
          const value = parseInt(event.target.textContent[0]);
          setActive(value);
          SetIsChecked(false);
          setSelectedList([]);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <br />
      <Pagination size="m">{items}</Pagination>
      <br />
    </div>
  );

  const updateTable = (data) => {
    const updatedData = filteredList.map((user) => {
      if (user.id === data.id) {
        return data;
      } else {
        return user;
      }
    });
    setFilteredList(updatedData);
  };

  const searchUserItem = (event) => {
    const searchInput = event.target.value.toLowerCase();
    let resultList = usersList.filter((user) => {
      if (
        user.name.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput) ||
        user.role.toLowerCase().includes(searchInput)
      ) {
        return user;
      } else {
        return null;
      }
    });
    setFilteredList(resultList);
  };

  const deleteUserFromUi = (id) => {
    const updatedList = filteredList.filter((user) => user.id !== id);
    setFilteredList(updatedList);
  };

  const removeFromSelectedList = (id) => {
    const updatedList = selectedList.filter((userId) => userId !== id);
    setSelectedList(updatedList);
  };

  const addToSelectedList = (id) => {
    console.log(selectedList);
    if (!selectedList.includes(id)) {
      setSelectedList((prevState) => {
        return [...prevState, id];
      });
    }
  };

  const updateSelectedList = () => {
    const masterCheckBox = document.getElementById("masterCheckBox");
    const masterCheckBoxChecked = masterCheckBox.checked;
    if (masterCheckBoxChecked === true) {
      const updatedSelectedList = filteredList.map((user) => {
        const upperLimit = active * 10;
        const lowerLimit = upperLimit - offset;
        if (parseInt(user.id) <= upperLimit && parseInt(user.id) > lowerLimit) {
          return user.id;
        }
        return null;
      });
      const formattedList = updatedSelectedList.filter((item) => item !== null);
      setSelectedList(formattedList);
    } else {
      setSelectedList([]);
    }
  };

  const DeleteSelectedList = () => {
    const finalList = filteredList.filter(
      (user) => !selectedList.includes(user.id)
    );
    setFilteredList(finalList);
    setSelectedList([]);
  };

  const renderColumnTitle = () => (
    <>
      <ColumnTitles>
        <Row>
          <TitleHeading>
            <CheckBox
              type="checkbox"
              id="masterCheckBox"
              onChange={() => {
                SetIsChecked(!isChecked);
                updateSelectedList();
              }}
              checked={isChecked}
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

  return (
    <SuccessViewContainer>
      <DeleteAndSearchInputContainer>
        {selectedList.length > 0 ? (
          <DeleteSelectedButton type="button" onClick={DeleteSelectedList}>
            Delete Selected
          </DeleteSelectedButton>
        ) : null}
        <SearchElement
          type="search"
          placeholder="Search by email,name or role"
          onChange={searchUserItem}
        />
      </DeleteAndSearchInputContainer>
      <Table>
        {renderColumnTitle()}
        <TableBody>
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
                  updateTable={updateTable}
                  addToSelectedList={addToSelectedList}
                  removeFromSelectedList={removeFromSelectedList}
                />
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
      {paginationBasic}
    </SuccessViewContainer>
  );
};

export default ApiSuccessView;
