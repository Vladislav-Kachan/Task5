import React, { useState, useContext } from "react";
import { Form, Button, Container, Card, InputGroup, FormControl, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Context } from "..";
import { sendMail } from "../http/MailAPI";
import { EMAIL_ROUTE } from "../utils/const";

const NewMail = () => {
  let options = [];
  let defaultOption;
  const recev = localStorage.getItem("receiver");
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { allUsers } = useContext(Context);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const InitOptions = () => {
    allUsers.user.forEach((element) => {
      if (user.user.id != element.id)
        options.push({ value: element.id, label: element.email });
    });

    if (recev) {
      options.map(function (el, index) {
        if (el.value == recev) {
          defaultOption = index;
        }
      });
    }
  };

  InitOptions();

  const SendMessage = async () => {
    const userId = user.user.id;
    if (!title || !message) {
      alert("Fill in all the fields");
      return;
    }
    if (recev && !selectedOption) {
      sendMail(userId, recev, title, message);
      navigate(EMAIL_ROUTE);
      return;
    }
    if (!selectedOption) {
      alert("Fill in all the fields");
      return;
    }
    selectedOption.forEach((receiverId) => {
      sendMail(userId, receiverId.value, title, message);
    });
    navigate(EMAIL_ROUTE);
  };

  function moveToNewMail() {
    localStorage.removeItem("receiver");
    navigate(EMAIL_ROUTE);
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 900 }} className="p-5">
        <h2 className="">New email</h2>
        <Form className="d-flex flex-column">
          <InputGroup className="mb-2 mt-3">
            <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
            <Select
              isMulti
              defaultValue={options[defaultOption]}
              onChange={setSelectedOption}
              options={options}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input subject..."
              aria-label="Subject"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <FloatingLabel controlId="floatingTextarea2" label="Message:">
            <Form.Control
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              as="textarea"
              style={{ height: "400px" }}
            />
          </FloatingLabel>
          <div>
            <Button
              style={{ width: 100 }}
              onClick={SendMessage}
              className="mt-3 m-2"
            >
              Send
            </Button>
            <Button
              variant="secondary"
              onClick={moveToNewMail}
              style={{ width: 100 }}
              className="mt-3 m-2"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default NewMail;
