import React, { useState } from 'react';
import { APPNAME } from '../config'
import Link from 'next/Link'
import Router from 'next/router'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

    NavbarText
} from 'reactstrap';
import { isAuth, signout } from '../actions/auth';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href='/'><NavbarBrand className="font-weight-bold">{APPNAME}</NavbarBrand></Link>

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
              </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {!isAuth() && <React.Fragment>
                        <Link href="/signin">

                            <NavbarText style={{ cursor: 'pointer' }} > Signin</NavbarText>
                        </Link>
                        <Link href="/signup">

                            <NavbarText style={{ cursor: 'pointer' }} className="pl-2">Signup</NavbarText>
                        </Link>
                    </React.Fragment>}

                    {isAuth() && (

                        <NavbarText style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace('/signin'))} className="pl-2">Signout</NavbarText>
                    )}

                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;