import React, { createContext, useEffect, useRef, useState } from "react";
import clientJsonData from "../assets/data/clientJsonExtra"
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
                category: point.activity_name,
                name: point.client_name,
                uid: point.client_db_ref
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
            options: { radius: 50, maxZoom: 17 }
        });

        async function fetchData(url) {
            return await JSON.parse(JSON.stringify(url));
        }

        useEffect(() => {
            fetchData(clientJsonData).then(result => {
                const filterNullJson = result.details.filter(det => {
                    return det.latitude !== null || det.longitude !== null
                });

                setResult(_.uniqBy(filterNullJson, "client_db_ref"))
            });
        }, []);

        const updateQuery = (event) => {
            event.preventDefault();
            const query = event.target.value;
            setQuery(query);
            const filter = result.filter(area => area.client_name.match(new RegExp(`.*${ query }.*`, 'gi')));
            setFilterResult(filter)
        };

        const setZoomProvider = (zoom) => {
            setZoom(zoom)
        };
        const setBoundsProvider = (bounds) => {
            setBounds(bounds)
        };

        const onChildClick = (key, childProps) => {
            setQuery(childProps.clientName);
            const filter = result.filter(area => area.client_db_ref.match(new RegExp(`.*${ childProps.clientDbRef }.*`, 'gi')));
            setFilterResult(filter);
        };

        const onChildMouseEnter = (key, childProps) => {
            setPlaceKeyHovered(key);
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
                mapApiLoaded,
                mapInstance,
                hoverPlaceKey,
                mapApi,
                query,
                clusters,
                supercluster,
                zoom,
                points
            } }>{ props.children }</Provider>
        )
    }
;
export { store, MapProvider }
