import React, { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import PopupMenu from './components/PopupMenu';
import TablePage from './components/TablePage';
import MapPage from './components/MapPage';
import './App.css';

const App = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [orderName, setOrderName] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [cost, setCost] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [components, setComponents] = useState('');
    const [addressFrom, setAddressFrom] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleButtonClick = (buttonNumber) => {
        if (buttonNumber === 1) {
            setShowTable(true);
            setShowMap(false);
        }
        closePopup();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!orderName || !vehicle || !cost || !companyName || !phone || !components || !addressFrom || !addressTo || !deadline) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        // Здесь вы можете обработать заказ, например, отправить на сервер

        // Устанавливаем старт и конец для маршрута
        setStart(addressFrom.split(',').map(Number)); // Пример: '55.751244, 37.618423'
        setEnd(addressTo.split(',').map(Number)); // Пример: '55.762244, 37.638423'

        setShowMap(true);
    };

    return (
        <div className="App">
            <Header onMenuClick={togglePopup} />
            {showPopup && <PopupMenu onClose={closePopup} onButtonClick={handleButtonClick} />}
            {showMap ? (
                <MapPage start={start} end={end} />
            ) : showTable ? (
                <TablePage />
            ) : (
                <div>
                    <h2>Добавить заказ</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Название заказа:
                            <input type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)} required />
                        </label>
                        <label>
                            Машина:
                            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} required>
                                <option value="">Выберите машину</option>
                                <option value="Грузовик">Грузовик</option>
                                <option value="Развозчик">Развозчик</option>
                                <option value="Минивэн">Минивэн</option>
                            </select>
                        </label>
                        <label>
                            Стоимость:
                            <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required min="0" />
                        </label>
                        <label>
                            Название компании:
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                        </label>
                        <label>
                            Телефон:
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </label>
                        <label>
                            Комплектующие:
                            <select value={components} onChange={(e) => setComponents(e.target.value)} required>
                                <option value="">Выберите комплектующие</option>
                                <option value="Комплект 1">Комплект 1</option>
                                <option value="Комплект 2">Комплект 2</option>
                                <option value="Комплект 3">Комплект 3</option>
                            </select>
                        </label>
                        <label>
                            Адрес (откуда):
                            <input type="text" value={addressFrom} onChange={(e) => setAddressFrom(e.target.value)} required />
                        </label>
                        <label>
                            Адрес (куда):
                            <input type="text" value={addressTo} onChange={(e) => setAddressTo(e.target.value)} required />
                        </label>
                        <label>
                            Срок:
                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                        </label>
                        <button type="submit">Добавить заказ</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default App;
