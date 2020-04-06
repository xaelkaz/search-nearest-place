import React, { useContext } from 'react';
import '../stylesheets/App.css';
import GoogleMapReact from 'google-map-react';
import { MapProvider, store } from "./hooks/mapProvider";
import MapView from "./map/MapView";

function App() {

    return (
        <div className="App">
            <MapProvider>
                <MapView/>
            </MapProvider>
        </div>
    );
}

export default App;
