import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';

function App() {

    const defaultProps = {
        center: {
            lat: 8.95,
            lng: -79.33
        },
        zoom: 11
    };
    return (
        <div className="App">
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0'}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default App;
