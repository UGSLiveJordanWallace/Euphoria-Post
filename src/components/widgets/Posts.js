import React, { useState } from 'react';
import Axios from 'axios';
import Post from './Post';
import { Card, Button, Alert, Accordion } from 'react-bootstrap';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    function handlePull() {
        Axios.get("http://localhost:4000/").then((response) => {
            if(response.data.errorMessage) {
                return setPosts(response.data.errorMessage);
            } else {
                setPosts(response.data);
            }
        });
    }

    return (
        <>
            {posts.map((val, key) => {
                return <Post header={val.username} email={val.email} post={val.message} index={key}/>
            })}
            <Button variant="dark" onClick={handlePull}> View Posts </Button> <br></br>
        </>
    )
}
