import GoogleMapReact from 'google-map-react'
import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimesCircle,
  faCreditCard,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft'
import moment from 'moment'
import { Comment } from 'antd'
import _ from 'lodash'
import { store } from '../../hooks/mapProvider'
import MarkerMap from '../../components/map/points/single/MarkerMap'
import {
  CollapseBtn,
  CollapseSideBarContent,
  CollapseInput,
  LabelVariants,
  mapStyles,
  Menu,
  MenuItem,
  MenuLabel,
  Sidebar,
  SidebarVariants,
  Avatar,
  AvatarVariants,
  LogLink,
  SidebarLogin,
} from './styleContainer'
import SidebarMenu from '../tag/TagView'
import { ActiveFilter, ListTag } from '../../components/tag/list-tag-active'
import { CommentList } from '../../components/comment/commentList'
import { Editor } from '../../components/comment/editor'

const Marker = ({ children }) => children

const GOOGLE_MAP_API = process.env.REACT_GOOGLE_MAP_API

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
    sidebarCollapsed,
    filterByTag,
  } = useContext(store)

  const defaultProps = {
    center: {
      lat: 8.986984,
      lng: -79.518519,
    },
    zoom: 10,
    maxZoom: 19,
  }
  const [isLiked, setIsLiked] = useState(false)

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds)
      })
    })
  }

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds()

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.latitude, place.longitude))
    })
    return bounds
  }

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places)
    // Fit map to bounds
    map.fitBounds(bounds)
    // Bind the resize listener
    bindResizeListener(map, maps, bounds)
  }

  // const clientData = filterResult.length > 0 ? filterResult : result;

  if (filterResult.length === 0 && !mapApiLoaded) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  const resetZoomCenter = (event) => {
    if (mapApiLoaded) {
      updateQuery(event, true)
      return apiIsLoaded(mapInstance, mapApi, result)
    }
  }

  const onselectstart = (e) => {
    e.preventDefault()
  }

  function renderIcon(motive) {
    if (motive != null) {
      return (
        <FontAwesomeIcon
          icon={faCreditCard}
          style={{ marginRight: 5 }}
          color="#C2185B"
          size="lg"
        />
      )
    }
    return (
      <FontAwesomeIcon
        icon={faGlobe}
        style={{ marginRight: 5 }}
        color="#4CAF50"
        size="lg"
      />
    )
  }

  function isLikedOnClick(e) {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  const handleSubmit = () => {
    if (!value) {
      return
    }
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
        ...comments,
      ])
    }, 1000)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
        onGoogleApiLoaded={({ map, maps }) => {
          map.setOptions({
            maxZoom: defaultProps.maxZoom,
          })
          apiHasLoaded(map, maps)
          apiIsLoaded(map, maps, filterResult)
        }}
        yesIWantToUseGoogleMapApiInternals
        zoom={defaultProps.zoom}
        layerTypes={[]}
        center={mapApiLoaded ? mapInstance.getCenter().toJSON() : reduceCenter}
        options={{ styles: mapStyles }}
        onChange={({ zoom, bounds }) => {
          setZoomProvider(zoom)
          setBoundsProvider([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ])
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${50 + (pointCount / points.length) * 20}px`,
                    height: `${50 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      17,
                    )
                    mapInstance.setZoom(expansionZoom)
                    mapInstance.panTo({ lat: latitude, lng: longitude })
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            )
          }
          return (
            <MarkerMap
              key={`point-${cluster.properties.pointId}`}
              lat={latitude}
              lng={longitude}
              mapInstance={mapInstance}
              client_name={cluster.properties.client_name}
              client_db_ref={cluster.properties.client_db_ref}
              motive={cluster.properties.motive}
              direction={cluster.properties.direction}
              hover={hoverPlaceKey === `point-${cluster.properties.pointId}`}
            />
          )
        })}
      </GoogleMapReact>
      <Sidebar
        initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
        animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
        variants={SidebarVariants}
      >
        <Menu>
          <SidebarLogin>
            <LogLink
              initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
              animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
              variants={LabelVariants}
            >
              Sign Out / Login
            </LogLink>
            <CollapseBtn onClick={(event) => toggleSidebar(event)}>
              {sidebarCollapsed ? (
                <FontAwesomeIcon icon={faBars} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
              )}
            </CollapseBtn>
          </SidebarLogin>
          <div className="input-group input-group-sm mb-3 clear-input">
            <CollapseInput
              initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
              animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
              variants={LabelVariants}
              onChange={updateQuery}
              placeholder="Buscar por ubicacion"
              type="text"
              onPaste={onselectstart}
              className="form-control"
              value={query}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
            <CollapseSideBarContent
              initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
              animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
              variants={LabelVariants}
              onClick={(event) => {
                resetZoomCenter(event)
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </CollapseSideBarContent>
          </div>
          <CollapseSideBarContent
            initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
            animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
            variants={LabelVariants}
          >
            <ActiveFilter>
              {filterByTag.length > 0 && <span>Filtros Activos: </span>}
              {_.uniqBy(filterByTag, 'activity_name').map((tag) => (
                <ListTag key={tag.id}>{tag.activity_name}</ListTag>
              ))}
            </ActiveFilter>
            <SidebarMenu data={result} selection="Gmail Subscribers" />
          </CollapseSideBarContent>
          {filterResult.length === 0 && (
            <div>
              <MenuLabel variants={LabelVariants}>
                <p>
                  No se encontraron resultados para la busqueda {query}{' '}
                  {filterByTag.length > 0
                    ? 'con los filtros seleccionados'
                    : ''}
                </p>
              </MenuLabel>
            </div>
          )}
          <div>
            {filterResult.map((area) => (
              <MenuItem key={area.id}>
                <MenuLabel
                  variants={LabelVariants}
                  onClick={(event) => {
                    onChildClick(event, area)
                    mapInstance.setZoom(15)
                    mapInstance.panTo({
                      lat: parseFloat(area.latitude),
                      lng: parseFloat(area.longitude),
                    })
                  }}
                  key={`point-${area.id}`}
                  onMouseEnter={(event) =>
                    onChildMouseEnter(event, `point-${area.id}`)
                  }
                  onMouseLeave={onChildMouseLeave}
                >
                  {renderIcon(area.motive_text)}
                  <span style={{ fontWeight: 700 }}>
                  </span>{' '}
                  {area.client_name}
                </MenuLabel>
                {filterResult.length === 1 && (
                  <div>
                    <Avatar
                      src={filterResult[0].media}
                      initial={sidebarCollapsed ? 'collapsed' : 'expanded'}
                      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
                      variants={AvatarVariants}
                    />
                    <div>
                      <MenuLabel variants={LabelVariants}>
                        <div className="">
                          <p
                            onClick={isLikedOnClick}
                            className={
                              !isLiked
                                ? 'HeartAnimation'
                                : 'HeartAnimation animate'
                            }
                          >
                            <span>1 Favoritos</span>
                          </p>
                          <p>{filterResult[0].direction}</p>
                          <h3>Comentarios</h3>
                          <div>
                            {comments.length > 0 && (
                              <CommentList comments={comments} />
                            )}
                            <Comment
                              avatar={
                                <Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                  alt="Han Solo"
                                />
                              }
                              content={
                                <Editor
                                  onChange={handleChange}
                                  onSubmit={handleSubmit}
                                  submitting={submitting}
                                  value={value}
                                />
                              }
                            />
                          </div>
                        </div>
                      </MenuLabel>
                    </div>
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default MapView
