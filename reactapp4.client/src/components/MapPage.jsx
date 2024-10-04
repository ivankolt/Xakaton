import React from 'react';
import MapComponent from './MapComponent';

const MapPage = ({ start, end }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Карта маршрута</h2>
            <MapComponent start={start} end={end} />
        </div>
    );
};

export default MapPage;
