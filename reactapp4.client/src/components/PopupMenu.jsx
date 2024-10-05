import React from 'react';
import './PopupMenu.css';

const PopupMenu = ({ onClose, onButtonClick }) => {
    return (
        <div className="popup-menu">
          
            <button className="popup-btn" onClick={() => { onButtonClick(2); onClose(); }}>Сотрудник</button>
            <button className="popup-btn" onClick={() => { onButtonClick(3); onClose(); }}>Координатор</button>
            <button className="popup-btn" onClick={() => { onButtonClick(4); onClose(); }}>Главная</button>
        </div>
    );
};

export default PopupMenu;
