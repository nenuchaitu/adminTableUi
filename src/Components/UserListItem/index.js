import { Row, TableValue, CheckBox, Button } from "./StyledComponents";
import React, { useState } from "react";

import { AiOutlineDelete, AiFillSave } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";

const UserListItem = (props) => {
  const [contentEditable, setContentEditable] = useState(false);
  const {
    user,
    deleteUserFromUi,
    updateTable,
    addToSelectedList,
    removeFromSelectedList,
  } = props;
  let { isChecked } = props;
  const [isListChecked, setIsListChecked] = useState(true);

  const onClickPassId = () => {
    deleteUserFromUi(user.id);
  };

  const onClickEditTable = () => {
    setContentEditable(true);
  };

  const onClickUpdateTableValues = () => {
    var cell = document.getElementsByTagName("td");
    const data = {
      id: user.id,
      name: cell[1].innerHTML,
      email: cell[2].innerHTML,
      role: cell[3].innerHTML,
    };
    updateTable(data);
    setContentEditable(false);
  };

  const cancelEdit = () => {
    setContentEditable(false);
  };

  const toggleCheckBox = () => {
    setIsListChecked(!isListChecked);
    const checkBoxValue = document.getElementById(`${user.id}`);
    const isTicked = checkBoxValue.checked;
    if (isTicked) {
      addToSelectedList(user.id);
    } else {
      removeFromSelectedList(user.id);
    }
  };

  const unSelectedValue = () => {
    if (isChecked === true) {
      if (isListChecked) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isListChecked) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <Row contentEditable={contentEditable}>
      <TableValue>
        <CheckBox
          type="checkbox"
          checked={(isChecked && isListChecked) || unSelectedValue()}
          onChange={toggleCheckBox}
          id={user.id}
        />
      </TableValue>
      <TableValue contentEditable={contentEditable}>{user.name}</TableValue>
      <TableValue contentEditable={contentEditable}>{user.email}</TableValue>
      <TableValue contentEditable={contentEditable}>{user.role}</TableValue>
      <TableValue>
        {contentEditable ? (
          <>
            <Button type="button" onClick={onClickUpdateTableValues}>
              <AiFillSave />
            </Button>
            <Button type="button" onClick={cancelEdit}>
              <FcCancel />
            </Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={onClickEditTable}>
              <BiEdit />
            </Button>
            <Button type="button" onClick={onClickPassId}>
              <AiOutlineDelete />
            </Button>
          </>
        )}
      </TableValue>
    </Row>
  );
};
export default UserListItem;
