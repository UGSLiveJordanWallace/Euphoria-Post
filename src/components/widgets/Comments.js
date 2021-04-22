import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Alert } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

const Comments = ({ username, message, id }) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    function handleDelete() {
        try {
            Axios.post('https://eph-app.herokuapp.com/delete-comment', {
                identification: id,
                username: username,
                message: message
            }).then((response) => {
                if(response.data.errorMessage) {
                    return setError(response.data.errorMessage);
                } else {
                    return setSuccess(response.data.successMessage);
                }
            });
        } catch (e) {

        }
    }

    return (
        <>
        <Card>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <h5>{username} <FaTrashAlt styles={{ cursor: 'pointer' }} onClick={handleDelete}/></h5>
                <p>{message}</p>
            </Card.Body>
        </Card>
        </>
    )
}

export default Comments
