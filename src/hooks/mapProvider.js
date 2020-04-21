import React, { createContext, useEffect, useState } from "react";
import clientJsonData from "../assets/data/client"
import _ from "lodash"
import useSupercluster from "use-supercluster";

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const MapProvider = (props) => {

        const [ result, setResult ] = useState([]);

        const [ filterByTag, setFilterByTag ] = useState([]);

        const [ filterResult, setFilterResult ] = useState([]);

        const [ mapApiLoaded, setMapApiLoaded ] = useState(false);
        const [ mapInstance, setMapInstance ] = useState(null);
        const [ mapApi, setMapApi ] = useState(null);

        const [ hoverPlaceKey, setPlaceKeyHovered ] = useState(0);

        const [ query, setQuery ] = useState("");

        const [ bounds, setBounds ] = useState(null);
        const [ zoom, setZoom ] = useState(10);

        const [ reduceCenter, setReduceCenter ] = useState([ 9.084515, -79.393285 ]);

        const [ sidebarCollapsed, setSidebarCollapsed ] = useState(true);

        const [ selected, setSelected ] = useState([]);

        const isSelected = name => {
            return selected.indexOf(name) !== -1;
        };

        const apiHasLoaded = (map, maps) => {
            setMapInstance(map);
            setMapApi(maps);
            setMapApiLoaded(true);
        };

        const clientData = filterResult.length > 0 ? filterResult : result;

        const points = filterResult.map(point => ({
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
                setFilterResult(filterUniqueValue)
            });
        }, []);

        const clearQueryInput = () => {
            handleFilterByTag(selected)
        };

        const updateQuery = (event, resetQuery = false) => {
            event.preventDefault();
            const query = event.target.value;
            const filter = filterByTag.length === 0 ? result.filter(area => area.client_name.match(new RegExp(`.*${ query }.*`, 'gi')))
                : filterByTag.filter(area => area.client_name.match(new RegExp(`.*${ query }.*`, 'gi')))
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
            setSidebarCollapsed(false);
        };

        const onChildMouseEnter = (event, childProps) => {
            event.preventDefault();
            setPlaceKeyHovered(childProps);
        };

        const onChildMouseLeave = () => {
            setPlaceKeyHovered(0);
        };

        const toggleSidebar = (e) => {
            e.preventDefault();
            setSidebarCollapsed(!sidebarCollapsed);
        };

        function handleFilterByTag(newSelected) {
            const filteredKeywords = result.filter((word) => newSelected.includes(word.activity_name));

            setFilterByTag(filteredKeywords);

            // Filter original list by tag
            setFilterResult(filteredKeywords)

            resetFilterByTag(filteredKeywords)
        }

        const handleClick = (event, name) => {
            const selectedIndex = selected.indexOf(name);
            let newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }

            handleFilterByTag(newSelected)

            setSelected(newSelected);
        };

        function resetFilterByTag(filteredKeywords) {
            setQuery('')
            if (filteredKeywords.length === 0) {
                setFilterResult(result)
            }
        }

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
                toggleSidebar,
                handleClick,
                isSelected,
                mapApiLoaded,
                mapInstance,
                hoverPlaceKey,
                mapApi,
                query,
                clusters,
                supercluster,
                points,
                reduceCenter,
                sidebarCollapsed,
                selected,
                filterByTag
            } }>{ props.children }</Provider>
        )
    }
;
export { store, MapProvider }
