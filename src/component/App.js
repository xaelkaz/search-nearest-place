import React, { useContext } from 'react';
import '../stylesheets/App.css';
import GoogleMapReact from 'google-map-react';
import { store } from "./hooks/mapProvider";

function App() {

    const {state, dispatch, result} = useContext(store);

    console.log(result);

    const defaultProps = {
        center: {
            lat: 8.95,
            lng: -79.33
        },
        zoom: 11
    };

    return (
        <div className="App">
            <div style={ { height: '100vh', width: '100%' } }>
                <GoogleMapReact
                    bootstrapURLKeys={ { key: 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0' } }
                    defaultCenter={ defaultProps.center }
                    defaultZoom={ defaultProps.zoom }
                >
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default App;
