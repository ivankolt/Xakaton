import React, { useState, useEffect } from 'react';
import './CoordinatorForm.css'; // Импортируйте стили


const CoordinatorForm = ({ onBack, onDataSubmit }) => {
    const [data, setData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    const [componentsData, setComponentsData] = useState([]);
    const [warehousesData, setWarehousesData] = useState([]);
    const fixedArrivalDate = new Date();
    const [isSaved, setIsSaved] = useState(false); // Новое состояние для сообщения о сохранении
    useEffect(() => {
        fetch('/data.json') // Укажите путь к вашему JSON файлу
            .then(response => response.json())
            .then(json => {
                setVehicleData(json.vehicleData);
                setComponentsData(json.componentsData);
                setWarehousesData(json.warehousesData);

                // Восстановление данных из localStorage
                const savedData = localStorage.getItem('coordinatorData');
                if (savedData) {
                    setData(JSON.parse(savedData));
                } else {
                    // Инициализируем данные для таблицы
                    setData([{
                        id: 1,
                        vehicle: '',
                        arrivalDate: '',
                        departureDate: '',
                        tripDuration: '',
                        numberOfRobots: 100,
                        weight: '',
                        applicationDate: '',
                        completionDate: '',
                        component: '',
                        city: '',
                        distance: '',
                        travelTime: '',
                        cost: '',
                        maxWeight: '',
                    }]);
                }
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }, []);



    const calculateTotalTime = (distance, weight, numberOfRobots, averageSpeed) => {
        const travelTimeToWarehouse = distance / averageSpeed; // Время в пути до склада в часах
        const travelTimeBack = travelTimeToWarehouse; // Время в пути обратно аналогично
        const totalWeight = weight * numberOfRobots;

        // Время загрузки в зависимости от веса
        let loadingTime = 0;
        if (totalWeight <= 2000) {
            loadingTime = 40; // 40 минут
        } else if (totalWeight <= 5000) {
            loadingTime = 60; // 60 минут
        } else {
            loadingTime = 120; // 120 минут
        }

        if (totalWeight > 20000) {
            loadingTime += 720; // Дополнительно 12 часов в минутах
        }

        // Общее время в пути
        const totalTimeToWarehouse = travelTimeToWarehouse + loadingTime / 60; // Время в часах
        const totalTimeBack = travelTimeBack; // Только время в пути обратно

        // Рассчитываем общее время в пути
        const totalTripTime = totalTimeToWarehouse + totalTimeBack; // Время в часах
        // Дополнительное время, если общее время в пути (туда и обратно) превышает 12 часов
        let daysInTrip = Math.ceil(totalTripTime / 24); // Переводим время в дни

        // Добавим дополнительные 12 часов, если общее время в пути когда-либо превышало 12 часов
        if (totalTripTime > 12) {
            daysInTrip += 1; // Добавляем еще сутки в случае превышения
        }

        return daysInTrip; // Возвращаем количество дней
    };




    const distanceFromChelyabinsk = {
        "Warehouses1": { "distance": 1700 }, // Москва
        "Warehouses2": { "distance": 2300 }, // Санкт-Петербург
        "Warehouses3": { "distance": 2100 }, // Ростов-на-Дону
        "Warehouses4": { "distance": 1000 }, // Пятигорск
        "Warehouses5": { "distance": 400 },  // Нижний Новгород
        "Warehouses6": { "distance": 200 },  // Екатеринбург
        "Warehouses7": { "distance": 1900 }, // Новосибирск
        "Warehouses8": { "distance": 4000 }  // Владивосток
    };

    const averageSpeed = 60; // средняя скорость в км/ч
    const deliveryCostPerTonKm = 8; // Стоимость доставки 8 руб/т/км

    const [employeeData, setEmployeeData] = useState({});

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
                    numberOfRobots: 100, // Установите начальное значение 100
                    weight: '',
                    applicationDate: applicationDate,
                    completionDate: completionDate,
                    component: '',
                    city: '',
                }]);
            })
            .catch(error => console.error('Ошибка при загрузке данных сотрудников:', error));
    }, []);
    const vehicleOptions = vehicleData.map(vehicle => vehicle.type);
    const componentOptions = componentsData.map(component => component.name);

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;

        // Сохранение данных в localStorage
        localStorage.setItem('coordinatorData', JSON.stringify(newData));

        // Обработка выбора компонент или количества роботов
        if (field === 'component' || field === 'numberOfRobots') {
            const selectedComponent = componentsData.find(c => c.name === newData[index].component);
            const totalRobots = parseInt(newData[index].numberOfRobots, 10);
            if (selectedComponent) {
                const totalWeight = selectedComponent.weight * totalRobots;
                newData[index].weight = totalWeight.toFixed(2);
                const selectedWarehouse = warehousesData.find(w => w.id === selectedComponent.warehouse_id);
                newData[index].city = selectedWarehouse ? selectedWarehouse.warehouse_coordinates : '';
                const distance = distanceFromChelyabinsk[selectedComponent.warehouse_id]?.distance;
                if (distance) {
                    newData[index].distance = distance;

                    // Рассчитываем количество дней в поездке
                    const daysInTrip = calculateTotalTime(distance, selectedComponent.weight, totalRobots, averageSpeed);
                    newData[index].tripDuration = daysInTrip;

                    // Обновляем время в пути
                    const travelTime = (distance / averageSpeed).toFixed(2);
                    newData[index].travelTime = travelTime;

                    // Обновляем стоимость доставки
                    const deliveryCost = (distance * (totalWeight / 1000) * deliveryCostPerTonKm).toFixed(2);
                    newData[index].cost = deliveryCost;

                    // Устанавливаем дату отправки на следующий день после оформления заявки
                    const applicationDate = new Date(newData[index].applicationDate);
                    if (!isNaN(applicationDate)) {
                        const departureDate = new Date(applicationDate);
                        departureDate.setDate(departureDate.getDate() + 1);
                        newData[index].departureDate = departureDate.toISOString().split('T')[0];
                    }

                    // Пересчитываем дату привозки на склад
                    calculateArrivalDate(newData, index);
                }
            } else {
                newData[index].weight = '';
                newData[index].cost = '';
            }
        }

        // Обновляем дату заявки и пересчитываем дату отправки
        if (field === 'applicationDate') {
            const applicationDate = new Date(value);
            if (!isNaN(applicationDate)) {
                const departureDate = new Date(applicationDate);
                departureDate.setDate(departureDate.getDate() + 1); // Устанавливаем на следующий день
                newData[index].departureDate = departureDate.toISOString().split('T')[0];
            }
        }

        // Обновляем другие поля
        if (field === 'vehicle') {
            const selectedVehicle = vehicleData.find(v => v.type === value);
            if (selectedVehicle) {
                newData[index].maxWeight = selectedVehicle.weightLimit;
            }
        }

        // Проверяем ограничение веса
        const totalWeight = parseFloat(newData[index].weight) || 0;
        const maxWeight = parseFloat(newData[index].maxWeight) || 0;
        if (totalWeight > maxWeight) {
            alert('Предупреждение: выберите другое транспортное средство!');
        }

        setData(newData);
    };


    // Функция для расчета даты привозки на склад
    const calculateArrivalDate = (newData, index) => {
        const departureDate = new Date(newData[index].departureDate);
        const daysInTrip = parseInt(newData[index].tripDuration, 10) || 0;
        const arrivalDateForWarehouse = new Date(departureDate.getTime() + daysInTrip * 24 * 60 * 60 * 1000);
        newData[index].arrivalDate = arrivalDateForWarehouse.toISOString().split('T')[0];
    };




    const handleAddRow = () => {
        const newRow = {
            id: data.length + 1,
            vehicle: '',
            arrivalDate: '',
            departureDate: '',
            tripDuration: '',
            numberOfRobots: 100,
            weight: '',
            applicationDate: employeeData.submissionDate || '',
            completionDate: employeeData.endDate || '',
            component: '',
            city: '',
            distance: '',
            travelTime: '',
            cost: '',
            maxWeight: '',
        };
        setData([...data, newRow]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "coordinator_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        onDataSubmit(data);

        // Устанавливаем состояние сохранения
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false); // Скрыть сообщение через 3 секунды
        }, 3000);
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
                            <th>Дней в поездке</th>
                            <th>Количество роботов</th>
                            <th>Вес (кг)</th>
                            <th>Макс. вес (кг)</th>
                            <th>Дата оформления заявки</th>
                            <th>Дата окончания плана по сборкам роботов</th>
                            <th>Комплектующие</th>
                            <th>Город</th>
                            <th>Километры</th>
                            <th>Время пути (ч)</th>
                            <th>Стоимость доставки (руб)</th>
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
                                        readOnly // Дата привозки не редактируется вручную
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
                                        value={item.numberOfRobots}
                                        onChange={(e) => handleChange(index, 'numberOfRobots', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.weight}
                                        readOnly
                                    />
                                </td>
                                <td>{item.maxWeight}</td>
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
                                <td>{item.distance}</td>
                                <td>{item.travelTime}</td>
                                <td>{item.cost}</td>
                                <td>
                                    <button type="button" onClick={() => handleRoute(index, true)}>На карту (A -> B)</button>
                                    <button type="button" onClick={() => handleRoute(index, false)}>На карту (B -> A)</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" className="add-row-button" onClick={handleAddRow}>Добавить строку</button>
            </form>
            <div className="button-container">
                <button type="button" className="back-button" onClick={onBack}>Назад</button>
                <button type="submit" className="save-button" form="coordinator-form">Сохранить данные</button>
            </div>

            {isSaved && <div className="saved-message">Данные успешно сохранены! ✅</div>} 

        </div>
    );
};

export default CoordinatorForm;
