import React from 'react'
import { Card } from 'react-bootstrap';

const Comments = ({ username, message }) => {
    return (
        <>
        <Card>
            <Card.Body>
            <h5>{username}</h5>
            <p>{message}</p>
            </Card.Body>
        </Card>
        </>
    )
}

export default Comments
