import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Circle } from '@react-google-maps/api'
import { Marker } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0'

class MapComponent extends Component {
    render() {
        return (
            <LoadScript
                id='script-loader'
                googleMapsApiKey={ GOOGLE_MAPS_API_KEY }>
                <GoogleMap
                    id='circle-example'
                    mapContainerStyle={ {
                        height: '100%',
                        width: '100%'
                    } }
                    zoom={ 13 }
                    center={ {
                        lat: 43.671108,
                        lng: -79.3793838
                    } }
                >
                    <Circle
                        // optional
                        onLoad={ circle => {
                            console.log('Circle onLoad circle: ', circle)
                        } }
                        // optional
                        onUnmount={ circle => {
                            console.log('Circle onUnmount circle: ', circle)
                        } }
                        // required
                        center={ {
                            lat: 43.671108,
                            lng: -79.3793838
                        } }
                        // required
                        options={ {
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.6,
                            strokeWeight: 1,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            radius: 125,
                            zIndex: 1
                        } }
                    />
                    <Marker position={ { lat: 43.671108, lng: -79.3793838 } }/>
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MapComponent
