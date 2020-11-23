// @flow
import * as React from 'react';
import {Nav, Navbar, NavbarText, NavItem, NavLink} from "reactstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";


export function Header() {
    const posts = useSelector((state: RootState) => state.posts);

    return (
        <>
            <Navbar color="light">
                <Nav className="mr-auto" navbar>
                    <NavItem className="mr-auto">
                        <NavLink href="/">Main</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>Total posts: {posts.length}</NavbarText>
            </Navbar>
        </>
    );
};
