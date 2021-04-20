import React from 'react';

export default function Header({ title }) {
    return (
        <div>
            <header>
                <h1 className="w-100 text-center">{title}</h1>
            </header>
        </div>
    )
}
