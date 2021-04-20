import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
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
            <Navbar bg="light" expand="sm">
            <Navbar.Brand href="">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" className="d-flex justify-content-end">
                <Nav.Link href="/">Posts</Nav.Link>
                <Nav.Link href="/create-post">Create Post</Nav.Link>
                <Navbar.Text>
                        Signed in as: <Link to="/login">{currentUser.email}</Link>
                </Navbar.Text>
                </Nav>
                <Form inline>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            <br></br>
        </>
    )
}

export default NavbarWidget;