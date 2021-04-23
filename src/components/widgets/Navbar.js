import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
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
            <Navbar.Brand href="/create-post">{title}</Navbar.Brand>
            <Navbar.Text>
                <Link to="/" className="px-2 text-decoration-none">Posts</Link>
            </Navbar.Text>
            <Navbar.Text>
                <Link to="/create-post" className="px-2 text-decoration-none">Create Post</Link>
            </Navbar.Text>
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