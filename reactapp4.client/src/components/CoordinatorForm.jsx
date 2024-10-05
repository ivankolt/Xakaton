import React, { useState, useEffect } from 'react';
import './CoordinatorForm.css'; // Импортируйте стили

const vehicleData = {
    vehicles: [
        {
            id: "vehicle1",
            type: "Транспортное средство 1",
            weightLimit: 1500,
            volumeLimit: 18,
            status: "На базе"
        },
        {
            id: "vehicle2",
            type: "Транспортное средство 2",
            weightLimit: 3000,
            volumeLimit: 25,
            status: "На базе"
        },
        {
            id: "vehicle3",
            type: "Транспортное средство 3",
            weightLimit: 700,
            volumeLimit: 4,
            status: "На базе"
        }
    ]
};

const componentsData = [
    {
        id: "component1",
        name: "Драйверы сервомоторов",
        warehouse_id: "Warehouses1"
    },
    {
        id: "component2",
        name: "Платы, микросхемы",
        warehouse_id: "Warehouses2"
    },
    {
        id: "component3",
        name: "Вставка",
        warehouse_id: "Warehouses3"
    },
    {
        id: "component4",
        name: "Манжеты",
        warehouse_id: "Warehouses3"
    },
    {
        id: "component5",
        name: "Блоки (контакт, плата)",
        warehouse_id: "Warehouses4"
    },
    {
        id: "component6",
        name: "Шайбы",
        warehouse_id: "Warehouses3"
    },
    {
        id: "component7",
        name: "Подшипники",
        warehouse_id: "Warehouses5"
    },
    {
        id: "component8",
        name: "Проводка",
        warehouse_id: "Warehouses2"
    },
    {
        id: "component9",
        name: "Ремни",
        warehouse_id: "Warehouses7"
    },
    {
        id: "component10",
        name: "Винты",
        warehouse_id: "Warehouses5"
    },
    {
        id: "component11",
        name: "Разъемы",
        warehouse_id: "Warehouses2"
    },
    {
        id: "component12",
        name: "Блоки питания",
        warehouse_id: "Warehouses4"
    },
    {
        id: "component13",
        name: "Редукторы",
        warehouse_id: "Warehouses6"
    },
    {
        id: "component14",
        name: "Серво-моторы",
        warehouse_id: "Warehouses1"
    },
    {
        id: "component15",
        name: "Резисторы, конденсаторы",
        warehouse_id: "Warehouses8"
    },
    {
        id: "component16",
        name: "Фитинги",
        warehouse_id: "Warehouses5"
    }
];

const warehousesData = [
    {
        id: "Warehouses1",
        warehouse_coordinates: "Москва",
        coords: "55.7558, 37.6173"
    },
    {
        id: "Warehouses2",
        warehouse_coordinates: "Санкт-Петербург",
        coords: "59.9343, 30.3351"
    },
    {
        id: "Warehouses3",
        warehouse_coordinates: "Ростов-на-Дону",
        coords: "47.2226, 39.7182"
    },
    {
        id: "Warehouses4",
        warehouse_coordinates: "Пятигорск",
        coords: "44.0393, 42.9180"
    },
    {
        id: "Warehouses5",
        warehouse_coordinates: "Нижний Новгород",
        coords: "56.2965, 43.9310"
    },
    {
        id: "Warehouses6",
        warehouse_coordinates: "Екатеринбург",
        coords: "56.8389, 60.6057"
    },
    {
        id: "Warehouses7",
        warehouse_coordinates: "Новосибирск",
        coords: "55.0084, 82.9346"
    },
    {
        id: "Warehouses8",
        warehouse_coordinates: "Владивосток",
        coords: "43.1156, 131.8855"
    }
];

const CoordinatorForm = ({ onBack, onDataSubmit }) => {
    const [data, setData] = useState([{
        id: 1,
        vehicle: '',
        arrivalDate: '',
        departureDate: '',
        tripDuration: '',
        weight: '',
        applicationDate: '',
        completionDate: '',
        component: '',
        city: '',
    }]);

    const [employeeData, setEmployeeData] = useState({});

    // Запрашиваем данные из Employee.json
    useEffect(() => {
        fetch('https://localhost:7044/api/Employee')
            .then(response => response.json())
            .then(data => {
                setEmployeeData(data);

                const applicationDate = data.submissionDate || '';
                const completionDate = data.endDate || '';

                setData([{
                    id: 1,
                    vehicle: '',
                    arrivalDate: '',
                    departureDate: '',
                    tripDuration: '',
                    weight: '',
                    applicationDate: applicationDate,
                    completionDate: completionDate,
                    component: '',
                    city: '',
                }]);
            })
            .catch(error => console.error('Ошибка при загрузке данных сотрудников:', error));
    }, []);

    const vehicleOptions = vehicleData.vehicles.map(vehicle => vehicle.type);
    const componentOptions = componentsData.map(component => component.name);

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;

        // Изменяем вес в зависимости от выбранного транспортного средства
        if (field === 'vehicle') {
            const selectedVehicle = vehicleData.vehicles.find(v => v.type === value);
            newData[index].weight = selectedVehicle ? selectedVehicle.weightLimit : '';
        }

        // Устанавливаем город в зависимости от выбранного компонента
        if (field === 'component') {
            const selectedComponent = componentsData.find(c => c.name === value);
            if (selectedComponent) {
                const selectedWarehouse = warehousesData.find(w => w.id === selectedComponent.warehouse_id);
                newData[index].city = selectedWarehouse ? selectedWarehouse.warehouse_coordinates : '';
            }
        }

        setData(newData);
    };

    const handleAddRow = () => {
        const newRow = {
            id: data.length + 1,
            vehicle: '',
            arrivalDate: '',
            departureDate: '',
            tripDuration: '',
            weight: '',
            applicationDate: employeeData.submissionDate || '',
            completionDate: employeeData.endDate || '',
            component: '',
            city: '',
        };
        setData([...data, newRow]);
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
        const selectedComponent = data[index].component;
        const selectedComponentData = componentsData.find(c => c.name === selectedComponent);
        const selectedWarehouse = warehousesData.find(w => w.id === selectedComponentData.warehouse_id);
        const toCoords = selectedWarehouse ? selectedWarehouse.coords : ''; // Координаты точки B

        if (toCoords) {
            const url = isFirstRoute ?
                `https://yandex.ru/maps/?rtext=${fromCoords}~${toCoords}&rtt=auto&weight=${weight}` :
                `https://yandex.ru/maps/?rtext=${toCoords}~${fromCoords}&rtt=auto&weight=${weight}`;
            window.open(url, '_blank');
        } else {
            alert('Пожалуйста, выберите комплектующее!');
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
                            <th>Дата оформления заявки</th>
                            <th>Дата окончания плана по сборкам роботов</th>
                            <th>Комплектующие</th>
                            <th>Город</th>
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
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={item.departureDate}
                                        onChange={(e) => handleChange(index, 'departureDate', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.tripDuration}
                                        onChange={(e) => handleChange(index, 'tripDuration', e.target.value)}
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
                                    <input
                                        type="date"
                                        value={item.applicationDate}
                                        onChange={(e) => handleChange(index, 'applicationDate', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={item.completionDate}
                                        onChange={(e) => handleChange(index, 'completionDate', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={item.component}
                                        onChange={(e) => handleChange(index, 'component', e.target.value)}
                                    >
                                        <option value="" disabled>Выберите комплектующее</option>
                                        {componentOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{item.city}</td>
                                <td>
                                    <button type="button" onClick={() => handleRoute(index, true)}>На карту (A -> B)</button>
                                    <button type="button" onClick={() => handleRoute(index, false)}>На карту (B -> A)</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddRow}>Добавить строку</button>
                <button type="submit">Сохранить данные</button>
            </form>
            <button onClick={onBack}>Назад</button>
        </div>
    );
};

export default CoordinatorForm;
