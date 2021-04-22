import React, { useRef, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import Axios from 'axios';

const Comment = ({ id }) => {
    const usernameRef = useRef();
    const messageRef = useRef(); 
    
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    function HandleComment(e) {
        e.preventDefault();

        try {
            Axios.post('https://eph-app.herokuapp.com/create-comment', {
                identification: id,
                message: messageRef.current.value,
                username: usernameRef.current.value
            }).then((response) => {
                if (response.data.errorMessage){
                    setError(response.data.errorMessage);
                } else {
                    setSuccess(response.data.successMessage);
                }
            });
        } catch (e) {

        }
    }

    return (
        <>
            <Form onSubmit={HandleComment}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form.Control className="mb-1" ref={usernameRef} required/>
                <Form.Control as="textarea" className="mb-3" ref={messageRef} required/>
                <Button type="submit">Comment</Button>
            </Form>
        </>
    )
}

export default Comment;