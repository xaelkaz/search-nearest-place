import React from 'react';
import '../stylesheets/App.scss';
import "antd/dist/antd.css";
import MapView from "./map/MapView";
import { MapProvider } from "../hooks/mapProvider";
import { Container } from "./map/styleContainer";

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
