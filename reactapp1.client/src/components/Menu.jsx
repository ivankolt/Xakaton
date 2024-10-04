import React from 'react';
import './Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <h1>Главное меню</h1>
            <div className="menu-buttons">
                <button className="menu-btn">Кнопка 1</button>
                <button className="menu-btn">Кнопка 2</button>
                <button className="menu-btn">Кнопка 3</button>
                <button className="menu-btn">Кнопка 4</button>
            </div>
        </div>
    );
};

export default Menu;
