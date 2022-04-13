import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Context } from "..";
import { blockUser, deleteUser, unlockUser } from "../http/UserAPI";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/const";
import { observer } from "mobx-react-lite";

const Users = observer(() => {
  const { user } = useContext(Context);
  const { allUsers } = useContext(Context);
  const selectedUsers = [];
  const navigate = useNavigate();

  const handleRowSelect = async (row, isSelected, e) => {
    if (isSelected) {
      selectedUsers.push(row.email);
    } else {
      let i = selectedUsers.indexOf(row.email);
      selectedUsers.splice(i, 1);
    }
    localStorage.setItem("selectedUsers", selectedUsers);
  };

  const handleRowSelectAll = async (isSelected, rows) => {
    if (isSelected) {
      rows.forEach((element) => {
        selectedUsers.push(element.email);
      });
    } else {
      rows.forEach((element) => {
        let i = selectedUsers.indexOf(element.email);
        selectedUsers.splice(i, 1);
      });
    }
    localStorage.setItem("selectedUsers", selectedUsers);
  };

  const dropUser = async () => {
    try {
      const i = selectedUsers.indexOf(user.user.email);
      const dataUser = await deleteUser(selectedUsers);
      allUsers.setUser(dataUser);
      if (i != -1) {
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const blockUsers = async () => {
    try {
      const i = selectedUsers.indexOf(user.user.email);
      const emails = localStorage.getItem("selectedUsers").split([","]);
      const dataUser = await blockUser(emails);

      allUsers.setUser(dataUser);
      if (i != -1) {
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const unlockUsers = async () => {
    try {
      const emails = localStorage.getItem("selectedUsers").split([","]);
      const dataUser = await unlockUser(emails);
      allUsers.setUser(dataUser);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: handleRowSelect,
    onSelectAll: handleRowSelectAll,
  };

  function dateFormatter(cell) {
    let i = cell.indexOf("T");
    return cell.substr(0, i);
  }

  return (
    <div>
      <div className="justify-content-center">
        <Button className="m-2" variant="outline-success" onClick={unlockUsers}>
          Unlock
        </Button>
        <Button className="m-2" variant="outline-warning" onClick={blockUsers}>
          Block
        </Button>
        <Button className="m-2" variant="outline-danger" onClick={dropUser}>
          Delete
        </Button>
      </div>

      <BootstrapTable
        data={allUsers.user}
        options={{ sortName: "id", sortOrder: "asc" }}
        selectRow={selectRow}
      >
        <TableHeaderColumn isKey dataField="id">
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="fullName">Name</TableHeaderColumn>
        <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
        <TableHeaderColumn dataField="date_regist" dataFormat={dateFormatter}>
          Registration
        </TableHeaderColumn>
        <TableHeaderColumn dataField="last_login" dataFormat={dateFormatter}>
          Last login
        </TableHeaderColumn>
        <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
});

export default Users;
