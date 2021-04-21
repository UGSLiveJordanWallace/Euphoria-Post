import React from 'react';
import NavbarWidget from './widgets/Navbar';
import Posts from './widgets/Posts';

export default function Public() {
    return (
        <>
            <NavbarWidget title="Teddy Bear" />
            <div>
                <h1 className="text-center" size="lg">Public</h1>
                <Posts />
                <br></br>
            </div>
        </>
    )
}
