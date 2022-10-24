import React, {useState, useEffect} from 'react'
import "./MapContainer.css"
import { Link } from 'react-router-dom'
import Map, { Marker, Popup} from 'react-map-gl';
import Pin from '../Pin/Pin';

function MapContainer({restaurants}) {
  let aveLon = restaurants.reduce((res, restaurant) => {
    res += (restaurant.lon / restaurants.length)
    return res
  }, 0)
  let aveLat = restaurants.reduce((res, restaurant) => {
    res += (restaurant.lat / restaurants.length)
    return res
  }, 0)
  const [pins, setPins] = useState(null)
  const [popupInfo, setPopupInfo] = useState(null);
  const viewport = {
    longitude: aveLon,
    latitude: aveLat,
    zoom: 11
  };

 useEffect(() => {
      const res = restaurants.map((restaurant) => {
        return <Marker
          key={restaurant.id}
          longitude={restaurant.lon}
          latitude={restaurant.lat}
          anchor="bottom"
          onClick={e => {
            //need event propagation cause i was not allowed to click on a marker to see details without it
            e.originalEvent.stopPropagation();
            setPopupInfo(restaurant);
          }}
        >
          <Pin />
        </Marker>
    })
    setPins(res)
},[restaurants])

  return (
    <Map 
    className="mapBox"
    initialViewState={viewport} 
    mapboxAccessToken={'pk.eyJ1IjoiZGF2aWRkYXciLCJhIjoiY2w5ajdtd3RhMHlrcTNubXc3N3J6dWNwdiJ9.Cslh_p8Ow8KRA6Zy3XDhbg'}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >

      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.lon}
          latitude={popupInfo.lat}
          onClose={() => setPopupInfo(null)}
        >
          <div className='popupDetails'>
            {popupInfo.name} | {' '}
            <Link className="popName" to={`/restaurant/${popupInfo.id}`}> View Details </Link>
          </div>
          <img width="100%" src={popupInfo.imageUrl} alt={popupInfo.name}/>
        </Popup>
      )}
    </Map>
  );
}
export default MapContainer