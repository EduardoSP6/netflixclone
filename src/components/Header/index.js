import React from 'react'

import './Header.css';

import logo from '../../assets/images/netflix-logo.png';
import avatar from '../../assets/images/user-avatar.png';

export default function Header({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header-logo">
                <a href="/">
                    <img src={logo} alt="Netflix" />
                </a>
            </div>
            <div className="header-user">
                <a href="/">
                    <img src={avatar} alt="User" />
                </a>
            </div>
        </header>
    );
}
