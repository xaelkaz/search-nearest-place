import React, { createContext, useEffect, useRef, useState } from "react";
import clientJsonData from "../assets/data/client"
import _ from "lodash"
import useSupercluster from "use-supercluster";

const initialState = {};
const store = createContext(initialState);
const { Provider, Consumer } = store;

const MapProvider = (props) => {

        const [ result, setResult ] = useState([]);
        const [ filterResult, setFilterResult ] = useState([]);

        const [ mapApiLoaded, setMapApiLoaded ] = useState(false);
        const [ mapInstance, setMapInstance ] = useState(null);
        const [ mapApi, setMapApi ] = useState(null);

        const [ hoverPlaceKey, setPlaceKeyHovered ] = useState(0);

        const [ query, setQuery ] = useState("");

        const mapRef = useRef();

        const [ bounds, setBounds ] = useState(null);
        const [ zoom, setZoom ] = useState(10);

        const [ reduceCenter, setReduceCenter ] = useState([ 9.084515, -79.393285 ]);

        const apiHasLoaded = (map, maps) => {
            setMapInstance(map);
            setMapApi(maps);
            setMapApiLoaded(true);
        };

        const clientData = filterResult.length > 0 ? filterResult : result;

        const points = clientData.map(point => ({
            type: "Feature",
            properties: {
                cluster: false,
                pointId: point.id,
                "category": point.activity_name,
                "client_name": point.client_name,
                "client_db_ref": point.client_db_ref,
                "motive": point.motive_text
            },
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(point.longitude),
                    parseFloat(point.latitude)
                ]
            }
        }));

        const { clusters, supercluster } = useSupercluster({
            points,
            bounds,
            zoom,
            options: { radius: 40, maxZoom: 18 }
        });

        async function fetchData(url) {
            return await JSON.parse(JSON.stringify(url));
        }

        useEffect(() => {
            fetchData(clientJsonData).then(result => {
                const filterNullJson = result.details.filter(det => {
                    return det.latitude !== null || det.longitude !== null
                });
                const filterUniqueValue = _.uniqBy(filterNullJson, "client_db_ref");

                const reduceLatitude = _.reduce(filterUniqueValue, function (sum, n) {
                    return parseFloat(sum) + parseFloat(n.latitude)
                }, 0);

                const reduceLongitude = _.reduce(filterUniqueValue, function (sum, n) {
                    return parseFloat(sum) + parseFloat(n.longitude)
                }, 0);

                setReduceCenter([ reduceLatitude / filterUniqueValue.length, reduceLongitude / filterUniqueValue.length ]);

                setResult(filterUniqueValue)
            });
        }, []);

        const clearQueryInput = () => {
            setQuery("");
        };

        const updateQuery = (event, resetQuery = false) => {
            event.preventDefault();
            const query = event.target.value;
            const filter = result.filter(area => area.client_name.match(new RegExp(`.*${ query }.*`, 'gi')));
            setFilterResult(filter);
            resetQuery ? clearQueryInput() : setQuery(query);
        };

        const setZoomProvider = (zoom) => {
            setZoom(zoom)
        };
        const setBoundsProvider = (bounds) => {
            setBounds(bounds)
        };

        const onChildClick = (event, childProps) => {
            event.preventDefault();
            setQuery(childProps.client_name);
            const filter = result.filter(area => area.client_db_ref.match(new RegExp(`.*${ childProps.client_db_ref }.*`, 'gi')));
            setFilterResult(filter);
        };

        const onChildMouseEnter = (event, childProps) => {
            event.preventDefault();
            setPlaceKeyHovered(childProps);
        };

        const onChildMouseLeave = () => {
            setPlaceKeyHovered(0);
        };

        return (
            <Provider value={ {
                result,
                filterResult,
                updateQuery,
                apiHasLoaded,
                onChildMouseEnter,
                onChildMouseLeave,
                onChildClick,
                setZoomProvider,
                setBoundsProvider,
                clearQueryInput,
                mapApiLoaded,
                mapInstance,
                hoverPlaceKey,
                mapApi,
                query,
                clusters,
                supercluster,
                points,
                reduceCenter
            } }>{ props.children }</Provider>
        )
    }
;
export { store, MapProvider }
