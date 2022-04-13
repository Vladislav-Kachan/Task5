import React, { useContext } from "react";
import { Context } from "../index";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar className="p-2" bg="dark" variant="dark">
      <Navbar.Brand>Web messeger</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end" />
      <Container fluid="sm" className="justify-content-end">
        {user.isAuth && (
          <Nav>
            <Navbar.Text className="p-2">
              Signed in as: <a>{user.user.email}</a>
            </Navbar.Text>
            <Button
              variant={"outline-light"}
              onClick={() => user.setIsAuth(false)}
            >
              Log out
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
