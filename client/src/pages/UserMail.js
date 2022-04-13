import React, { useContext, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { updateState } from "../http/MailAPI";
import { NEW_EMAIL_ROUTE } from "../utils/const";

const Users = observer(() => {
  const { mail } = useContext(Context);
  const selectedUsers = [];
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(true);
  const toggleHide = () => setShow(false);

  const [useridInf, setUseridInfo] = useState("");
  const userIdInfo = (id) => setUseridInfo(id);

  const [userInf, setUserInfo] = useState("");
  const userInfo = (user) => setUserInfo(user);

  const [titleInf, setTitleInfo] = useState("");
  const titleInfo = (title) => setTitleInfo(title);

  const [messageInf, setMessageInfo] = useState("");
  const messageInfo = (message) => setMessageInfo(message);

  const [dateInf, setDateInfo] = useState("");
  const dateInfo = (date) => setDateInfo(date);

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

  const onRowClick = async (row) => {
    if (row.status == "Unread") {
      await updateState(row.id);
    }
    userIdInfo(row.userId);
    userInfo(row.user);
    titleInfo(row.title);
    messageInfo(row.message);
    dateInfo(row.date.slice(0, 10));
    toggleShow();
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: handleRowSelect,
    onSelectAll: handleRowSelectAll,
  };

  const options = {
    sortName: "status",
    sortOrder: "desc",
    onRowClick: onRowClick,
  };

  function dateFormatter(cell) {
    let i = cell.indexOf("T");
    return cell.substr(0, i);
  }

  function statusFormatter(cell) {
    if (cell === "Unread") {
      return "new";
    }
    return;
  }

  function moveToNewMail() {
    localStorage.removeItem("receiver");
    navigate(NEW_EMAIL_ROUTE);
  }

  function replyMail() {
    localStorage.setItem("receiver", useridInf);
    navigate(NEW_EMAIL_ROUTE);
  }

  return (
    <div>
      <BootstrapTable
        data={mail.mail}
        headerStyle={{ display: "none" }}
        options={options}
        selectRow={selectRow}
        bordered={false}
        hover
      >
        <TableHeaderColumn
          tdStyle={{ display: "none" }}
          isKey
          dataField="id"
        ></TableHeaderColumn>
        <TableHeaderColumn
          tdStyle={{ color: "red" }}
          dataField="status"
          dataFormat={statusFormatter}
        ></TableHeaderColumn>
        <TableHeaderColumn dataField="user"></TableHeaderColumn>
        <TableHeaderColumn columnTitle dataField="title"></TableHeaderColumn>
        <TableHeaderColumn
          tdStyle={{ textAlign: "right" }}
          dataField="date"
          dataFormat={dateFormatter}
        ></TableHeaderColumn>
      </BootstrapTable>

      <Button
        variant="outline-info"
        className="rounded position-absolute end-0 m-2"
        onClick={moveToNewMail}
      >
        New message
      </Button>

      <ToastContainer position="middle-center" className="p-3">
        <Toast position="middle-center" show={show} onClose={toggleHide}>
          <Toast.Header>
            <strong className="me-auto">{userInf}</strong>
            <small>{dateInf}</small>
          </Toast.Header>
          <Toast.Body>
            <b>Title: </b> {titleInf}
            <br />
            <b>Message: </b> {messageInf}
          </Toast.Body>
          <Button className="m-2" onClick={replyMail}>
            Reply
          </Button>
        </Toast>
      </ToastContainer>
    </div>
  );
});

export default Users;
