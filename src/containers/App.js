import React from 'react';
import '../stylesheets/App.scss';
import MapView from "./map/MapView";
import { MapProvider } from "../hooks/mapProvider";
import { Container } from "../stylesheets/styleContainer";

function App() {

    return (
        <div className="App">
            <MapProvider>
                <Container>
                    <MapView/>
                </Container>
            </MapProvider>
        </div>
    );
}

export default App;
