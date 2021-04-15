import React from 'react';
import './Header.css';

const Header= ({black})=>{
    return(
        <header className={black ? 'black': ''}>
            <div className="header--logo">
            <a href="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="Netflix" />
            </a>
        </div>
        <div className="header--user">
            <img src="https://i.pinimg.com/474x/c3/53/7f/c3537f7ba5a6d09a4621a77046ca926d.jpg" alt="User" />
        </div>
        </header>
        
    )
}
export default Header;