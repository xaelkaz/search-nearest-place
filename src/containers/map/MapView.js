import GoogleMapReact from "google-map-react";
import React, { useContext, useState } from "react";
import MapPoint from "../../components/map/points/MapPoint";
import { store } from "../../hooks/mapProvider";
import ListOverMap from "../../components/map/list-over-map/list-over-map";
import { fitBounds } from 'google-map-react/utils';

const MapView = () => {

    const { state, dispatch, result, updateQuery } = useContext(store);

    const [ isApiLoaded, setApiLoaded ] = useState(false);

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

    // Re-center map when resizing the window
    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };


    // Return map bounds based on list of places
    const getMapBounds = (map, maps, places) => {
        const bounds = new maps.LatLngBounds();

        places.forEach((place) => {
            bounds.extend(new maps.LatLng(
                place.latitude,
                place.longitude
            ));
        });
        return bounds;
    };

    // Fit map to its bounds after the api is loaded
    const apiIsLoaded = (map, maps, places) => {
        // Get bounds by our places
        const bounds = getMapBounds(map, maps, places);
        // Fit map to bounds
        map.fitBounds(bounds);
        // Bind the resize listener
        bindResizeListener(map, maps, bounds);
    };

    return (
        <div style={ { height: '100vh', width: '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ { key: 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0' } }
                defaultCenter={ isApiLoaded ? getCenter(result) : [ parseFloat(result[0].latitude), parseFloat(result[0].longitude) ] }
                defaultZoom={ defaultProps.zoom }
                layerTypes={ [] }
                options={ { styles: modalMapStyles } }
                onGoogleApiLoaded={ ({ map, maps }) => apiIsLoaded(map, maps, result) }>
                { result.map((point => {
                    if (point.motive_text == null) {
                        return <MapPoint
                            key={ point.id }
                            lat={ parseFloat(point.latitude) }
                            lng={ parseFloat(point.longitude) }
                            text={ "Point 1" }
                            name="My Marker"
                            color="red"
                        />
                    } else {
                        return <MapPoint
                            key={ point.id }
                            lat={ parseFloat(point.latitude) }
                            lng={ parseFloat(point.longitude) }
                            text={ "Point 1" }
                            name="My Marker"
                            color="green"
                        />
                    }

                }))

                }
            </GoogleMapReact>
            <ListOverMap>
                <div>
                    <div className="input-group input-group-sm mb-3">
                        <input
                            onChange={ updateQuery }
                            placeholder="Buscar por cliente"
                            type="text"
                            className="form-control"
                            style={ {
                                width: 'calc(100% - 2rem)',
                                margin: '1rem 1rem 0rem 1rem',
                            } }
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {
                            (result.length > 0 ? result : result).map(area => (
                                <div className="list-item"
                                     key={ `item-${ area.id }` }>{ area.client_name } - { area.client_db_ref }</div>
                            ))
                        }
                    </div>
                </div>
            </ListOverMap>
        </div>
    )
};

export default MapView
