import { Row, TableValue, CheckBox, Button } from "./StyledComponent";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
const UserListItem = (props) => {
  const { user, isChecked, deleteUserFromUi } = props;
  const onClickPassId = () => {
    deleteUserFromUi(user.id);
  };
  return (
    <Row>
      <TableValue>
        <CheckBox type="checkbox" />
      </TableValue>
      <TableValue>{user.name}</TableValue>
      <TableValue>{user.email}</TableValue>
      <TableValue>{user.role}</TableValue>
      <TableValue>
        <Button type="button">
          <BiEdit />
        </Button>
        <Button type="button" onClick={onClickPassId}>
          <AiOutlineDelete />
        </Button>
      </TableValue>
    </Row>
  );
};
export default UserListItem;
