// components/CoordinatorForm.jsx
import React, { useState } from 'react';
import './CoordinatorForm.css'; // Импортируйте стили

const vehicleData = {
    "vehicles": [
        {
            "id": "vehicle1",
            "type": "Транспортное средство 1",
            "weightLimit": 1500,
            "volumeLimit": 18,
            "status": "На базе"
        },
        {
            "id": "vehicle2",
            "type": "Транспортное средство 2",
            "weightLimit": 3000,
            "volumeLimit": 25,
            "status": "На базе"
        },
        {
            "id": "vehicle3",
            "type": "Транспортное средство 3",
            "weightLimit": 700,
            "volumeLimit": 4,
            "status": "На базе"
        }
    ]
};

const CoordinatorForm = ({ onBack, onDataSubmit }) => {
    const [data, setData] = useState([
        { id: 1, vehicle: '', arrivalDate: '', departureDate: '', tripDuration: '', weight: '' },
        { id: 2, vehicle: '', arrivalDate: '', departureDate: '', tripDuration: '', weight: '' },
    ]);

    const vehicleOptions = vehicleData.vehicles.map(vehicle => vehicle.type);

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;

        // Изменяем вес в зависимости от выбранного транспортного средства
        if (field === 'vehicle') {
            const selectedVehicle = vehicleData.vehicles.find(v => v.type === value);
            newData[index].weight = selectedVehicle ? selectedVehicle.weightLimit : '';
        }

        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Создаем файл JSON для скачивания
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "coordinator_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Передаем данные родительскому компоненту для отображения
        onDataSubmit(data);
    };

    const handleRoute = (index, isFirstRoute) => {
        const weight = data[index].weight;
        const fromCoords = '55.159837, 61.402316'; // Координаты точки A
        const toCoords = prompt("Введите координаты выгрузки (широта, долгота):", ""); // Запрос координат для точки B
        if (toCoords) {
            const url = isFirstRoute ?
                `https://yandex.ru/maps/?rtext=${fromCoords}~${toCoords}&rtt=auto&weight=${weight}` :
                `https://yandex.ru/maps/?rtext=${toCoords}~${fromCoords}&rtt=auto&weight=${weight}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="coordinator-form">
            <h2>Форма Координатора</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Транспортное средство</th>
                            <th>Дата привозки товаров на склад в Челябинск</th>
                            <th>Итоговая дата отправки в рейс</th>
                            <th>Дней в поездке с учетом неполадок</th>
                            <th>Вес (кг)</th>
                            <th>Маршрут</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <select
                                        value={item.vehicle}
                                        onChange={(e) => handleChange(index, 'vehicle', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Выберите транспортное средство</option>
                                        {vehicleOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={item.arrivalDate}
                                        onChange={(e) => handleChange(index, 'arrivalDate', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={item.departureDate}
                                        onChange={(e) => handleChange(index, 'departureDate', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.tripDuration}
                                        onChange={(e) => handleChange(index, 'tripDuration', e.target.value)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.weight}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRoute(index, true)}>На карту (A -> B)</button>
                                    <button type="button" onClick={() => handleRoute(index, false)}>На карту (B -> A)</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Сохранить данные</button>
            </form>
            <button onClick={onBack}>Назад</button>
        </div>
    );
};

export default CoordinatorForm;
