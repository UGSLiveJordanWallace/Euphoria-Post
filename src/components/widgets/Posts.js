import React, { useState } from 'react';
import Axios from 'axios';
import Post from './Post';
import { Button } from 'react-bootstrap';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    function handlePull() {
        Axios.get("https://eph-app.herokuapp.com/").then((response) => {
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
                return <Post header={val.username} email={val.email} post={val.message} id={val.id} date={val.date} index={key}/>
            })}
            <Button variant="dark" onClick={handlePull}> View Posts </Button> <br></br>
        </>
    )
}
