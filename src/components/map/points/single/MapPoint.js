import React from 'react'

const MapPoint = (props) => {
  const { color, name, id } = props
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  )
}

export default MapPoint
