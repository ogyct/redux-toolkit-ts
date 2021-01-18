// @flow
import * as React from 'react';
import {Nav, Navbar, NavbarText, NavItem, NavLink} from "reactstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link} from "react-router-dom";


export function Header() {
    const postsState = useSelector((state: RootState) => state.posts);

    return (
        <>
            <Navbar color="light" expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem className="mr-auto">
                        <NavLink tag={Link} to="/posts">Posts</NavLink>
                    </NavItem>
                    <NavItem className="mr-auto">
                        <NavLink tag={Link} to="/about">About</NavLink>
                    </NavItem>
                    <NavItem className="mr-auto">
                        <NavLink tag={Link} to="/table">Table</NavLink>
                    </NavItem>
                    <NavItem className="mr-auto">
                        <NavLink tag={Link} to="/protected">Protected source</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>Total posts: {postsState.posts.length}</NavbarText>
            </Navbar>
        </>
    );
};
