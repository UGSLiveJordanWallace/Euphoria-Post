import React from 'react'
import FormBody from './Form';
import NavbarWidget from './widgets/Navbar';

export default function CreatePost() {
    return (
        <>
            <NavbarWidget title="Teddy Bear" />
            <FormBody title="Euphoria"/>
        </>
    );
}
