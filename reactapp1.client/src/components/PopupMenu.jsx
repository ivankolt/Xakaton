import React from 'react';
import './PopupMenu.css';

const PopupMenu = ({ onClose, onButtonClick }) => {
    return (
        <div className="popup-menu">
            <button className="popup-btn" onClick={() => { onButtonClick(1); onClose(); }}>Таблица</button>
            <button className="popup-btn" onClick={() => { onButtonClick(2); onClose(); }}>Кнопка 2</button>
            <button className="popup-btn" onClick={() => { onButtonClick(3); onClose(); }}>Кнопка 3</button>
            <button className="popup-btn" onClick={() => { onButtonClick(4); onClose(); }}>Кнопка 4</button>
        </div>
    );
};

export default PopupMenu;
