import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapComponent = ({ start, end }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const ymaps = window.ymaps;

        if (ymaps && mapRef.current) {
            ymaps.ready(() => {
                // ќчистка карты при новом рендеринге
                if (mapInstance.current) {
                    mapInstance.current.destroy(); // ”ничтожаем предыдущую карту
                }

                mapInstance.current = new ymaps.Map(mapRef.current, {
                    center: [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2],
                    zoom: 10,
                });

                const multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [start, end],
                    params: {
                        results: 1,
                    },
                });

                mapInstance.current.geoObjects.add(multiRoute);
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
