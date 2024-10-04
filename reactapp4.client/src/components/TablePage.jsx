// components/TablePage.jsx
import React from 'react';
import './TablePage.css'; // Создайте файл стилей для таблицы

const TablePage = () => {
    const data = [
        { id: 1, dateRequest: '2023-10-01', dateArrival: '2023-10-05', cost: '100$', vehicle: 'Грузовик', weight: '200kg', volume: '1m³', comment: 'Срочно' },
        { id: 2, dateRequest: '2023-10-02', dateArrival: '2023-10-06', cost: '150$', vehicle: 'Минивэн', weight: '150kg', volume: '0.5m³', comment: 'Оплачено' },
        // Добавьте больше данных по мере необходимости
    ];

    return (
        <div className="table-page">
            <h2>Информация о заявках</h2>
            <table>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Дата заявки</th>
                        <th>Дата прихода</th>
                        <th>Стоимость</th>
                        <th>Машина</th>
                        <th>Вес</th>
                        <th>Объем</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.dateRequest}</td>
                            <td>{item.dateArrival}</td>
                            <td>{item.cost}</td>
                            <td>{item.vehicle}</td>
                            <td>{item.weight}</td>
                            <td>{item.volume}</td>
                            <td>{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablePage;
