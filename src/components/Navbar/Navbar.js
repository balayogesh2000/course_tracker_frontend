import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import classes from "./Navbar.module.css";

const NavbarComp = () => {
  return (
    <div className={classes.Navbar}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Course Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${classes.nav}`}>
              <Nav.Link>
                <NavLink
                  className={classes.navLink}
                  style={{ textDecoration: "none" }}
                  to="/course"
                  activeClassName={classes.linkActive}
                  exact
                >
                  Courses
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className={classes.navLink}
                  style={{ textDecoration: "none" }}
                  to="/create-course"
                  activeClassName={classes.linkActive}
                  exact
                >
                  Track new course
                </NavLink>
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
