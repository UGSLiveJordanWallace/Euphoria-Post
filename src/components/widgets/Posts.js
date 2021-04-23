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
                if (val.image){
                    console.log(val.image);
                    return <Post header={val.username} email={val.email} post={val.message} id={val.id} index={key} image={val.image}/>
                } else {
                    return <Post header={val.username} email={val.email} post={val.message} id={val.id} index={key}/>
                }
            })}
            <Button variant="dark" onClick={handlePull}> View Posts </Button> <br></br>
        </>
    )
}
