import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapComponent = ({ start, end }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const ymaps = window.ymaps;

        if (ymaps && mapRef.current) {
            ymaps.ready(() => {
                // Очистка карты
                if (mapInstance.current) {
                    mapInstance.current.destroy();
                }

                const myMap = new ymaps.Map(mapRef.current, {
                    center: start,
                    zoom: 10,
                });

                // Создание маршрута
                const referencePoints = [start, ...end];
                const multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints,
                    params: {
                        results: 1,
                    },
                });

                // Добавление маршрута на карту
                myMap.geoObjects.add(multiRoute);

                // Обработка расчета маршрута
                multiRoute.model.events.add('requestsuccess', () => {
                    const activeRoute = multiRoute.getActiveRoute();
                    const distance = activeRoute.properties.get('metaDataProperty').geoObjects.get(0).properties.get('distance');
                    const duration = activeRoute.properties.get('metaDataProperty').geoObjects.get(0).properties.get('duration');
                    alert(`Длина маршрута: ${distance} м, Время в пути: ${duration} мин.`);
                });
            });
        }
    }, [start, end]);

    return <div ref={mapRef} style={{ width: '700px', height: '500px', margin: '0 auto' }} />;
};

MapComponent.propTypes = {
    start: PropTypes.array.isRequired,
    end: PropTypes.array.isRequired,
};

export default MapComponent;
