import React, { useContext } from 'react';
import '../stylesheets/App.scss';
import MapView from "./map/MapView";
import { MapProvider } from "../hooks/mapProvider";

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
