import GoogleMapReact from "google-map-react";
import React, { useContext } from "react";
import { store } from "../../hooks/mapProvider";
import ListOverMap from "../../components/map/list-over-map/list-over-map";
import MapPoint from "../../components/map/points/MapPoint";
import { mapStyles } from "./mapStyle";
import _ from "lodash";


const MapView = () => {

    const {
        result, filterResult,
        updateQuery, apiHasLoaded,
        mapApiLoaded, mapInstance, mapApi
    } = useContext(store);

    const defaultProps = {
        center: {
            lat: 8.986984,
            lng: -79.518519
        },
        zoom: 12
    };

    if (result.length === 0 && !mapApiLoaded) {
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

    const clientData = filterResult.length > 0 ? filterResult : result;

    const reduceLatitude = _.reduce(clientData, function (sum, n) {
        return parseFloat(sum) + parseFloat(n.latitude)
    }, 0);

    const reduceLongitude = _.reduce(clientData, function (sum, n) {
        return parseFloat(sum) + parseFloat(n.longitude)
    }, 0);

    return (
        <div style={ { height: '100vh', width: '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ { key: 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0' } }
                defaultCenter={ mapApiLoaded ? apiIsLoaded(mapInstance, mapApi, clientData) :
                    [ reduceLatitude / clientData.length, reduceLongitude / clientData.length ] }
                zoom={ defaultProps.zoom }
                layerTypes={ [] }
                options={ { styles: mapStyles } }
                onGoogleApiLoaded={ ({ map, maps }) => {
                    map.setOptions({
                        maxZoom: 17,
                        minZoom: defaultProps.zoom
                    });
                    apiHasLoaded(map, maps)
                } }>
                { clientData.map((point => {
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
                            (filterResult.length > 0 ? filterResult : result).map(area => (
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
