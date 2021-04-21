import React, { useRef } from 'react';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Comment = ({ id }) => {
    const usernameRef = useRef();
    const messageRef = useRef(); 

    function HandleComment(e) {
        e.preventDefault();

        try {
            Axios.post('https://eph-app.herokuapp.com/create-comment', {
                identification: id,
                message: messageRef.current.value,
                username: usernameRef.current.value
            }).then((response) => {
                if (response.data.errorMessage){
                    console.log(response.data.errorMessage);
                } else {
                    console.log(response.data.successMessage);
                }
            });
        } catch (e) {

        }
    }

    return (
        <>
            <Form onSubmit={HandleComment}>
                <Form.Control className="mb-1" ref={usernameRef} required/>
                <Form.Control as="textarea" className="mb-3" ref={messageRef} required/>
                <Button type="submit">Comment</Button>
            </Form>
        </>
    )
}

export default Comment;