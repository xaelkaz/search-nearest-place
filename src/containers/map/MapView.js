import GoogleMapReact from "google-map-react";
import React, { useContext } from "react";
import { store } from "../../hooks/mapProvider";
import MarkerMapSale from "../../components/map/points/single/MarkerMapSale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
    CollapseBtn, CollapseIconInput, CollapseInput, LabelVariants, mapStyles,
    Menu,
    MenuItem,
    MenuLabel,
    Sidebar,
    SidebarVariants
} from "./styleContainer";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import SidebarMenu from "../tag/TagView";

const Marker = ({ children }) => children;

const GOOGLE_MAP_API = 'AIzaSyB5rtdt0SYpcBBr0czE96PvkEzt8yw-XG0';

const MapView = () => {

    const {
        result,
        filterResult,
        updateQuery,
        onChildMouseEnter,
        onChildMouseLeave,
        toggleSidebar,
        apiHasLoaded,
        mapApiLoaded,
        mapInstance,
        mapApi,
        query,
        setZoomProvider,
        setBoundsProvider,
        clusters,
        supercluster,
        points,
        reduceCenter,
        onChildClick,
        hoverPlaceKey,
        sidebarCollapsed
    } = useContext(store);

    const defaultProps = {
        center: {
            lat: 8.986984,
            lng: -79.518519
        },
        zoom: 10,
        maxZoom: 19
    };

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

    //const clientData = filterResult.length > 0 ? filterResult : result;

    if (filterResult.length === 0 && !mapApiLoaded) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }

    const resetZoomCenter = (event) => {
        if (mapApiLoaded) {
            updateQuery(event, true);
            return apiIsLoaded(mapInstance, mapApi, result)
        }
    };

    const onselectstart = (e) => {
        e.preventDefault()
    };

    function renderIcon(motive) {
        if (motive != null) {
            return <FontAwesomeIcon icon={ faTimesCircle } style={ { marginRight: 5 } } color={ "#D32F2F" } size="lg"/>
        }
        return <FontAwesomeIcon icon={ faCheckCircle } style={ { marginRight: 5 } } color={ "#4CAF50" } size="lg"/>
    }

    return (
        <div style={ { height: '100vh', width: '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ { key: GOOGLE_MAP_API } }
                onGoogleApiLoaded={ ({ map, maps }) => {
                    map.setOptions({
                        maxZoom: defaultProps.maxZoom,
                    });
                    apiHasLoaded(map, maps);
                    apiIsLoaded(map, maps, filterResult)
                } }
                yesIWantToUseGoogleMapApiInternals
                zoom={ defaultProps.zoom }
                layerTypes={ [] }
                center={ mapApiLoaded ? mapInstance.getCenter().toJSON() : reduceCenter }
                options={ { styles: mapStyles } }
                onChange={ ({ zoom, bounds }) => {
                    setZoomProvider(zoom);
                    setBoundsProvider([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                } }>
                { clusters.map(cluster => {
                    const [ longitude, latitude ] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                key={ `cluster-${ cluster.id }` }
                                lat={ latitude }
                                lng={ longitude }
                            >
                                <div
                                    className="cluster-marker"
                                    style={ {
                                        width: `${ 50 + (pointCount / points.length) * 20 }px`,
                                        height: `${ 50 + (pointCount / points.length) * 20 }px`
                                    } }
                                    onClick={ () => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            17
                                        );
                                        mapInstance.setZoom(expansionZoom);
                                        mapInstance.panTo({ lat: latitude, lng: longitude });
                                    } }
                                >
                                    { pointCount }
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <MarkerMapSale
                            key={ `point-${ cluster.properties.pointId }` }
                            lat={ latitude }
                            lng={ longitude }
                            mapInstance={ mapInstance }
                            client_name={ cluster.properties.client_name }
                            client_db_ref={ cluster.properties.client_db_ref }
                            motive={ cluster.properties.motive }
                            hover={ hoverPlaceKey === `point-${ cluster.properties.pointId }` }
                        />
                    );
                }) }
            </GoogleMapReact>
            <Sidebar
                initial={ sidebarCollapsed ? "collapsed" : "expanded" }
                animate={ sidebarCollapsed ? "collapsed" : "expanded" }
                variants={ SidebarVariants }>
                <Menu>
                    <CollapseBtn onClick={ (event) => toggleSidebar(event) }>
                        { sidebarCollapsed ? <FontAwesomeIcon icon={ faBars } size="lg"/> :
                            <FontAwesomeIcon icon={ faAngleDoubleLeft } size="lg"/> }
                    </CollapseBtn>
                    <div className="input-group input-group-sm mb-3 clear-input">
                        <CollapseInput
                            initial={ sidebarCollapsed ? "collapsed" : "expanded" }
                            animate={ sidebarCollapsed ? "collapsed" : "expanded" }
                            variants={ LabelVariants }
                            onChange={ updateQuery }
                            placeholder="Buscar por cliente"
                            type="text"
                            onPaste={ onselectstart }
                            className="form-control"
                            value={ query }
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"/>
                        <CollapseIconInput
                            initial={ sidebarCollapsed ? "collapsed" : "expanded" }
                            animate={ sidebarCollapsed ? "collapsed" : "expanded" }
                            variants={ LabelVariants }
                            onClick={ (event => {
                                resetZoomCenter(event)
                            }) }><FontAwesomeIcon icon={ faTimesCircle }/></CollapseIconInput>

                    </div>
                    <CollapseIconInput
                        initial={ sidebarCollapsed ? "collapsed" : "expanded" }
                        animate={ sidebarCollapsed ? "collapsed" : "expanded" }
                        variants={ LabelVariants }
                    >
                        <SidebarMenu data={ result } selection="Gmail Subscribers"/>
                    </CollapseIconInput>
                    <div>
                        {
                            (filterResult).map(area => (
                                <MenuItem key={ area.id }>
                                    <MenuLabel
                                        variants={ LabelVariants }
                                        onClick={ (event => {
                                            onChildClick(event, area);
                                            mapInstance.setZoom(15);
                                            mapInstance.panTo({
                                                lat: parseFloat(area.latitude),
                                                lng: parseFloat(area.longitude)
                                            });
                                        }) }
                                        key={ `point-${ area.id }` }
                                        onMouseEnter={ (event => (onChildMouseEnter(event, `point-${ area.id }`))) }
                                        onMouseLeave={ onChildMouseLeave }>
                                        {
                                            renderIcon(area.motive_text)
                                        }
                                        <span
                                            style={ { fontWeight: 700 } }>{ area.client_db_ref }</span> - { (area.client_name) }
                                    </MenuLabel>
                                </MenuItem>
                            ))
                        }
                    </div>
                </Menu>

            </Sidebar>
        </div>
    )
};

export default MapView;
