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
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [loading, setLoading] = useState(false);

    function fileSelectedHandler(event) {
        setImage(event.target.files[0]);
        setImageName(event.target.files[0].name);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (image === [] || image === undefined || image === "") {
            try{
                setError('');
                setSentMessage('');
                setLoading(true);
                Axios.post("https://eph-app.herokuapp.com/create-post", {
                    username: usernameRef.current.value,
                    email: email,
                    message: messageRef.current.value
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

        } else {
            const formData = new FormData();
            formData.append('username', usernameRef.current.value)
            formData.append('email', email)
            formData.append('message', messageRef.current.value)
            formData.append('file', image);

            try{
                setError('');
                setSentMessage('');
                setLoading(true);
                Axios.post("https://eph-app.herokuapp.com/upload-image-post", formData).then((response) => {
                    if(response.data.errorMessage) {
                        return setError(response.data.errorMessage);
                    }
                    else {
                        return setSentMessage(response.data.successMessage);
                    }
                });
            } catch (e) {
                if (e.response.status === 500) {
                    return setError("Problem With Server");
                } else {
                    return setError(e.response.data.msg);
                }
            }

            setLoading(false);
        }
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
                        <input type="file" className="custom-file-input" id="customFile" onChange={fileSelectedHandler} />
                        <label className='custom-file-label' htmlFor='customFile'>
                            {imageName}
                        </label>
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
