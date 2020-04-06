import GoogleMapReact from "google-map-react";
import React, { useContext } from "react";
import MapPoint from "./MapPoint";
import { store } from "../hooks/mapProvider";

const MapView = () => {

    const { state, dispatch, result } = useContext(store);

    const defaultProps = {
        center: {
            lat: 8.986984,
            lng: -79.518519
        },
        zoom: 15
    };
    const modalMapStyles = [
        {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    color: "#e0efef"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    hue: "#1900ff"
                },
                {
                    color: "#c0e8e8"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 900
                },
                {
                    visibility: "simplified"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    lightness: 700
                }
            ]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [
                {
                    color: "#7dcdcd"
                }
            ]
        }
    ];

    if (result.length === 0) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }
    return (
        <div style={ { height: '100vh', width: '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ { key: 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0' } }
                defaultCenter={ [ parseFloat(result[0].latitude), parseFloat(result[0].longitude) ] }
                defaultZoom={ defaultProps.zoom }
                layerTypes={ [] }
                options={ { styles: modalMapStyles } }

            >
                { result.map((point => {
                    return <MapPoint
                        key={ point.id }
                        lat={ parseFloat(point.latitude) }
                        lng={ parseFloat(point.longitude) }
                        text={ "Point 1" }
                        name="My Marker"
                        color="red"
                    />
                }))

                }
            </GoogleMapReact>
        </div>
    )
};

export default MapView
