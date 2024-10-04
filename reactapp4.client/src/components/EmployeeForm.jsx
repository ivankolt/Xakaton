// components/EmployeeForm.jsx
import React, { useState } from 'react';
import './EmployeeForm.css'; // Импортируйте стили

// Данные из вашей базы данных JSON
const componentData = [
    { id: "component1", name: "Драйверы сервомоторов", warehouse_id: "Warehouses1" },
    { id: "component2", name: "Платы, микросхемы", warehouse_id: "Warehouses2" },
    { id: "component3", name: "Вставка", warehouse_id: "Warehouses3" },
    { id: "component4", name: "Манжеты", warehouse_id: "Warehouses3" },
    { id: "component5", name: "Блоки (контакт, плата)", warehouse_id: "Warehouses4" },
    { id: "component6", name: "Шайбы", warehouse_id: "Warehouses3" },
    { id: "component7", name: "Подшипники", warehouse_id: "Warehouses5" },
    { id: "component8", name: "Проводка", warehouse_id: "Warehouses2" },
    { id: "component9", name: "Ремни", warehouse_id: "Warehouses7" },
    { id: "component10", name: "Винты", warehouse_id: "Warehouses5" },
    { id: "component11", name: "Разъемы", warehouse_id: "Warehouses2" },
    { id: "component12", name: "Блоки питания", warehouse_id: "Warehouses4" },
    { id: "component13", name: "Редукторы", warehouse_id: "Warehouses6" },
    { id: "component14", name: "Серво-моторы", warehouse_id: "Warehouses1" },
    { id: "component15", name: "Резисторы, конденсаторы", warehouse_id: "Warehouses8" },
    { id: "component16", name: "Фитинги", warehouse_id: "Warehouses5" }
];

const warehouseCoordinates = {
    "Warehouses1": "55.7558, 37.6173", // Москва
    "Warehouses2": "59.9343, 30.3351", // Санкт-Петербург
    "Warehouses3": "47.2221, 39.7184", // Ростов-на-Дону
    "Warehouses4": "44.0384, 42.8962", // Пятигорск
    "Warehouses5": "56.2965, 43.9333", // Нижний Новгород
    "Warehouses6": "56.8389, 60.6057", // Екатеринбург
    "Warehouses7": "55.0084, 82.9346", // Новосибирск
    "Warehouses8": "43.1166, 131.8825"  // Владивосток
};

const EmployeeForm = ({ onBack }) => {
    const [components, setComponents] = useState('');
    const [fromCoordinates, setFromCoordinates] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleComponentChange = (e) => {
        const selectedComponent = e.target.value;
        setComponents(selectedComponent);

        // Получаем ID склада выбранного комплектующего
        const component = componentData.find(comp => comp.name === selectedComponent);
        if (component) {
            setFromCoordinates(warehouseCoordinates[component.warehouse_id] || '');
        } else {
            setFromCoordinates('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Тут можно обработать данные формы
        console.log({ components, fromCoordinates, endDate });
    };

    return (
        <div className="employee-form">
            <h2>Форма Сотрудника</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Комплектующие:
                    <select value={components} onChange={handleComponentChange} required>
                        <option value="">Выберите комплектующие</option>
                        {componentData.map(component => (
                            <option key={component.id} value={component.name}>
                                {component.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Координаты склада:
                    <input type="text" value={fromCoordinates} readOnly />
                </label>

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
            <button onClick={onBack}>Назад</button> {/* Кнопка "Назад" */}
        </div>
    );
};

export default EmployeeForm;
