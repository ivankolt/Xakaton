import React, { useState } from 'react';
import Header from './components/Header';
import PopupMenu from './components/PopupMenu';
import TablePage from './components/TablePage';
import EmployeeForm from './components/EmployeeForm';
import CoordinatorForm from './components/CoordinatorForm';
import './App.css';
import Menu from './components/Menu';


const App = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [currentForm, setCurrentForm] = useState(null); // Новое состояние для текущей формы
    const [applications, setApplications] = useState([]); // Хранение заявок

    // Функция для добавления новой заявки
    const addApplication = (application) => {
        setApplications(prev => [...prev, application]);
    };


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleButtonClick = (buttonNumber) => {
        if (buttonNumber === 1) {
            setCurrentForm('table'); // Показать таблицу
        } else if (buttonNumber === 2) {
            setCurrentForm('employee'); // Показать форму сотрудника
        } else if (buttonNumber === 3) {
            setCurrentForm('coordinator'); // Показать форму координатора
        } else if (buttonNumber === 4) {
            setCurrentForm('menu'); // Показать форму выбора пользователя
        }
        closePopup(); // Закрываем поп-ап после выбора
    };

    return (
        <div className="App">
            <Header onClose={closePopup} onMenuClick={togglePopup} />
            {showPopup && <PopupMenu onClose={closePopup} onButtonClick={handleButtonClick} />}

            {currentForm === 'table' && <TablePage />}
            {currentForm === 'coordinator' && <CoordinatorForm applications={applications} onBack={() => setCurrentForm(null)} />}
            {currentForm === 'employee' && <EmployeeForm addApplication={addApplication} onBack={() => setCurrentForm(null)} />}



            {currentForm === 'menu' && <Menu onButtonClick={handleButtonClick} />}
            {!currentForm  && <Menu onButtonClick={handleButtonClick} />} {/* Отображаем выбор пользователя */}


        </div>
    );
};

export default App;
