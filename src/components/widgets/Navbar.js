import React from 'react';
import { Navbar, Nav, Form, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavbarWidget = ({ title }) => {
    const { currentUser } = useAuth();
    const { logout } = useAuth();

    async function handleLogout() {
        console.log("Hello World");

        try{
            await logout();
        } catch (e) {
            // Pass
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="justify-content-space-between">
            <Button variant="outline-none">{''}</Button>
            <Navbar.Brand href="">{title}</Navbar.Brand>
            <Nav.Link href="/">Posts</Nav.Link>
            <Nav.Link href="/create-post">Create Post</Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                <Navbar.Text>
                        Signed in as: <Link to="/login" className="px-2">{currentUser.email}</Link>
                </Navbar.Text>
                <Navbar.Text>
                    
                </Navbar.Text>
                </Nav>
                <Nav>
                    <Button variant="outline-danger" className="" onClick={handleLogout}>Logout</Button>
                </Nav>
                <Button variant="outline-none">{''}</Button>
            </Navbar.Collapse>
            </Navbar>
            <br></br>
        </>
    )
}

export default NavbarWidget;