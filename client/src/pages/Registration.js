import React, { useState, useContext } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, EMAIL_ROUTE } from "../utils/const";
import { registration, getUsers } from "../http/UserAPI";
import { Context } from "../index";

const Registration = () => {
  const { user } = useContext(Context);
  const { allUsers } = useContext(Context);
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const newUser = async () => {
    try {
      const data = await registration(fullName, email, password);
      user.setUser(data);
      user.setIsAuth(true);
      const dataUser = await getUsers();
      allUsers.setUser(dataUser);
      navigate(EMAIL_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Registration</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Input your name..."
          />
          <Form.Control
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your email..."
          />
          <Form.Control
            className="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Input your password..."
          />
          <Button
            className="mt-3 pl-3 pr-3"
            onClick={newUser}
            variant="outline-success"
          >
            Sign me up
          </Button>
          <div className="mt-3 align-self-center">
            Already have an account? <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Registration;
