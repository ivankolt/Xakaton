// components/App.jsx
import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import CoordinatorForm from './CoordinatorForm';

const App = () => {
    const [currentForm, setCurrentForm] = useState(null);
    const [requests, setRequests] = useState([]);

    const handleShowCoordinatorForm = () => setCurrentForm('coordinator');
    const handleShowEmployeeForm = () => setCurrentForm('employee');

    const handleDataSubmit = (newData) => {
        setRequests([...requests, ...newData]);
        setCurrentForm(null); // Скрыть форму после успешной отправки
    };

    return (
        <div>
            <h1>Управление заявками</h1>
            <button onClick={handleShowCoordinatorForm}>Форма Координатора</button>
            <button onClick={handleShowEmployeeForm}>Форма Сотрудника</button>

            {currentForm === 'coordinator' && <CoordinatorForm onBack={() => setCurrentForm(null)} onDataSubmit={handleDataSubmit} />}
            {currentForm === 'employee' && <EmployeeForm onBack={() => setCurrentForm(null)} />}

            {requests.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Транспортное средство</th>
                            <th>Дата привозки</th>
                            <th>Дата отправки</th>
                            <th>Дней в поездке</th>
                            <th>Вес (кг)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.vehicle}</td>
                                <td>{request.arrivalDate}</td>
                                <td>{request.departureDate}</td>
                                <td>{request.tripDuration}</td>
                                <td>{request.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
