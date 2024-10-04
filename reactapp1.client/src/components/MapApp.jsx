import { useState } from 'react';
import MapComponent from './MapApp';

const MapApp = () => {
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMap(true);
    };

    const handleRouteCalculated = ({ distance, duration }) => {
        setRouteInfo({ distance, duration });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Start (e.g. 55.751244, 37.618423)"
                    onChange={(e) => setStart(e.target.value.split(',').map(Number))}
                />
                <input
                    type="text"
                    placeholder="End (e.g. 55.751244, 37.618423)"
                    onChange={(e) => setEnd(e.target.value.split(',').map(Number))}
                />
                <button type="submit">Построить</button>
            </form>
            {showMap && (
                <div>
                    <MapComponent
                        start={start}
                        end={end}
                        onRouteCalculated={handleRouteCalculated}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <label>
                            DLINA
                            <input
                                type="text"
                                value={routeInfo.distance}
                                readOnly
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                        <br />
                        <label>
                            VREMA
                            <input
                                type="text"
                                value={routeInfo.duration}
                                readOnly
                                style={{ marginLeft: '10px', marginTop: '10px' }}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapApp;
