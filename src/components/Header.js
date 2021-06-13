import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="white" light expand="lg">
                <Link to='/'>
                    <img src='/coffee1.png' style={{width:'90px', display:'block'}} />
                </Link>
                <NavbarBrand tag={Link} to={"/"} >Coffee Ordering System </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar >
                        <NavItem>
                            <NavLink tag={Link} to={'/'} >Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to={'/create'} >Order</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to={'/sales'} >Previous Sales</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <hr className="my-3" />
        </div>
    )
}
