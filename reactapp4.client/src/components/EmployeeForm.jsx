// components/EmployeeForm.jsx
import { useState } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onBack }) => {
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApplication = {
            submissionDate: new Date().toISOString().split('T')[0], // текущая дата
            endDate, // дата окончания
        };

        fetch('https://localhost:7044/api/Employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newApplication),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="employee-form">
            <h2>Форма Сотрудника</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Дата оформления заявки:
                    <input type="date" value={new Date().toISOString().split('T')[0]} readOnly />
                </label>

                <label>
                    Дата окончания плана по сборкам роботов:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </label>

                <button type="submit">Отправить заявку</button>
            </form>
            <button onClick={onBack}>Назад</button>
        </div>
    );
};

export default EmployeeForm;
