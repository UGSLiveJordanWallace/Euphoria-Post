import React, { useState, useRef } from 'react';
import Header from './Header';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Form, Alert } from 'react-bootstrap';

export default function FormBody({ title }) {
    const { currentUser } = useAuth();
    const usernameRef = useRef();
    const email = currentUser.email;
    const messageRef = useRef();
    const [error, setError] = useState('');
    const [sentMessage, setSentMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        let d = new Date();
        const dateTime = d.toUTCString();

            try{
                setError('');
                setSentMessage('');
                setLoading(true);
                Axios.post("https://eph-app.herokuapp.com/create-post", {
                    username: usernameRef.current.value,
                    email: email,
                    message: messageRef.current.value,
                    date: dateTime
                }).then((response) => {
                    if (response.data.errorMessage) {
                        return setError(response.data.errorMessage);
                    }
                    else if (response.data.successMessage){
                        return setSentMessage(response.data.successMessage);
                    }
                    else {
                        return setError('');
                    }
                });
    
            } catch (e) {
                setError("Unable to send data to the database: " + e);
            }
            setLoading(false);

        }

    return (
        <>
            <Card>
                <Card.Body>
                    {}
                    <Form onSubmit={handleSubmit}>
                        <Header title={title} />
                        {error && <Alert variant="danger">{error}</Alert>}
                        {sentMessage && <Alert variant="success">{sentMessage}</Alert>}
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control placeholder="Username" ref={usernameRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control as="textarea" ref={messageRef} rows={5} required/>
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Button disabled={loading} className="w-100" variant="primary" type="submit" size="lg">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
