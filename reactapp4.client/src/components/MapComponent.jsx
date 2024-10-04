import  { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapComponent = ({ start, end }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const ymaps = window.ymaps;

        if (ymaps && mapRef.current) {
            ymaps.ready(() => {
                if (mapInstance.current) {
                    mapInstance.current.destroy();
                }

                const myMap = new ymaps.Map(mapRef.current, {
                    center: start, // Center on start point
                    zoom: 10,
                });

                // Generate multi-route with start and endpoints
                const referencePoints = [start, ...end]; // Taking into account multiple endpoints
                const multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints,
                    params: {
                        results: 1,
                    },
                });

                // Add the route to the map
                myMap.geoObjects.add(multiRoute);

                // Show start and end point labels
                const points = multiRoute.getWayPoints();
                points.options.set('preset', 'islands#redStretchyIcon');
                points.get(0).properties.set('iconContent', 'Точка отправления'); // Starting point
                points.get(points.getLength() - 1).properties.set('iconContent', 'Точка прибытия'); // Last destination

                // Handle the route calculation (distance and duration)
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
