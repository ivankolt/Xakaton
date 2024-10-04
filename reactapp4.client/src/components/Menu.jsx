import React from 'react';
import './Menu.css';

const Menu = ({ onButtonClick }) => {
    return (
        <div className="menu">
            <h1>Выбор пользователя</h1>
            <div className="menu-buttons">
                <button className="menu-btn" onClick={() => onButtonClick(2)}>Сотрудник</button>
                <button className="menu-btn" onClick={() => onButtonClick(3)}>Координатор</button>
            </div>
        </div>
    );
};

export default Menu;
