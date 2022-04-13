import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { EMAIL_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import { getUsers, login } from "../http/UserAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getMails } from "../http/MailAPI";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const { mail } = useContext(Context);
  const { allUsers } = useContext(Context);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const data = await login(email, password);
      user.setUser(data);
      user.setIsAuth(true);
      const dataUser = await getUsers();
      const dataMail = await getMails(user.user.id);
      dataMail.forEach((element) => {
        element.user = element.user.email;
      });
      mail.setMail(dataMail);
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
        <h2 className="m-auto">Authorization</h2>
        <Form className="d-flex flex-column">
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
            onClick={signIn}
            variant="outline-success"
          >
            Sign in
          </Button>
          <div className="mt-3 align-self-center">
            No account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
