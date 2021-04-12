// @flow
import * as React from "react";
import { Nav, Navbar, NavbarText, NavItem, NavLink } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import ControlsComponent from "../controls/ControlsComponent";
import { postSelectors } from "../slices/PostsSlice";

export function Header() {
  const postsState = useSelector((state: RootState) =>
    postSelectors.selectIds(state)
  );

  return (
    <>
      <Navbar color="light" expand="md" className="mb-3">
        <Nav className="mr-auto" navbar>
          <NavItem className="mr-auto">
            <NavLink tag={Link} to="/posts">
              Posts
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink tag={Link} to="/about">
              About
            </NavLink>
          </NavItem>
        </Nav>
        <ControlsComponent />
        <NavbarText className="pl-3">
          Total posts: {postsState.length}
        </NavbarText>
      </Navbar>
    </>
  );
};
