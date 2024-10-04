import React from 'react';
import './Header.css';

const Header = ({ onMenuClick }) => {
    return (
        <header className="header">
            <h1>Менеджер заказов</h1>
            <button className="menu-button" onClick={onMenuClick}>
                Меню
            </button>
        </header>
    );
};

export default Header;
