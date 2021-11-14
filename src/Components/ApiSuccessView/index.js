import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

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
  TableContainer,
} from "./StyledComponents";

const ApiSuccessView = (props) => {
  const limit = 10;
  const { usersList } = props;
  const lastPage = Math.ceil(usersList.length / 10);
  const [active, setActive] = useState(1);
  const [isMasterChecked, SetIsMasterChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [filteredList, setFilteredList] = useState(usersList);
  useEffect(() => {
    const updateSelectedList = () => {
      var updatedSelectedList = [];
      filteredList.forEach((user) => {
        if (user.isChecked === true) {
          updatedSelectedList.push(user.id);
        }
      });
      setSelectedList(updatedSelectedList);
    };
    updateSelectedList();
  }, [filteredList]);

  const items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(event) => {
          const value = parseInt(event.target.textContent[0]);
          setActive(value);
          SetIsMasterChecked(false);
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

  const DeleteSelectedList = () => {
    const finalList = filteredList.filter(
      (user) => !selectedList.includes(user.id)
    );
    setFilteredList(finalList);
    setSelectedList([]);
  };

  const toggleCheckboxInList = (id) => {
    if (isMasterChecked) {
      const updatedFilterList = filteredList.map((user) => {
        if (user.id === id) {
          return { ...user, isChecked: !user.isChecked };
        }
        return user;
      });
      setFilteredList(updatedFilterList);
      SetIsMasterChecked(false);
    } else {
      const updatedFilterList = filteredList.map((user) => {
        if (user.id === id) {
          return { ...user, isChecked: !user.isChecked };
        }
        return user;
      });
      setFilteredList(updatedFilterList);
    }
  };

  const toggleMasterCheckBox = async () => {
    const masterCheckBox = document.getElementById("masterCheckBox");
    const masterCheckBoxChecked = masterCheckBox.checked;
    if (masterCheckBoxChecked === true) {
      const updatedSelectedList = [];
      const updatedFilteredList = filteredList.map((user) => {
        const upperLimit = active * 10;
        const lowerLimit = upperLimit - limit;
        if (parseInt(user.id) <= upperLimit && parseInt(user.id) > lowerLimit) {
          updatedSelectedList.push(user.id);
          return { ...user, isChecked: true };
        }
        return null;
      });
      const formattedFilteredList = updatedFilteredList.filter(
        (item) => item !== null
      );
      setSelectedList(updatedSelectedList);
      setFilteredList(formattedFilteredList);
    } else {
      if (selectedList.length === 10) {
        const updatedFilterList = filteredList.map((user) => {
          return { ...user, isChecked: false };
        });
        setFilteredList(updatedFilterList);
        setSelectedList([]);
      }
    }
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
                SetIsMasterChecked(!isMasterChecked);
                toggleMasterCheckBox();
              }}
              checked={isMasterChecked}
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
      <TableContainer>
        <Table>
          {renderColumnTitle()}
          <TableBody>
            {filteredList.map((user) => {
              const upperLimit = active * 10;
              const lowerLimit = upperLimit - limit;
              if (
                parseInt(user.id) <= upperLimit &&
                parseInt(user.id) > lowerLimit
              ) {
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isMasterChecked={isMasterChecked}
                    deleteUserFromUi={deleteUserFromUi}
                    updateTable={updateTable}
                    toggleCheckboxInList={toggleCheckboxInList}
                  />
                );
              } else {
                return null;
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {paginationBasic}
    </SuccessViewContainer>
  );
};

export default ApiSuccessView;
