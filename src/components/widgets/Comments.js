import React, { useState } from 'react';
import Axios from 'axios';
import { Card } from 'react-bootstrap';
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
            <h5 className="d-inline-flex">{username}</h5>
            <div className="d-inline-flex p-2 col-example ml-3"><FaTrashAlt styles={{ cursor: 'pointer' }} onClick={handleDelete}/></div>
            <p>{message}</p>
            </Card.Body>
        </Card>
        </>
    )
}

export default Comments
