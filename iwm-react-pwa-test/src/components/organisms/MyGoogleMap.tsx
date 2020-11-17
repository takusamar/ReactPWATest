import React, { useCallback, useRef } from "react"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"

import { mapStyles } from "../../mapStyles"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url"
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。

const mapContainerStyle = {
  height: window.innerHeight,
  width: window.innerWidth,
}
// 地図の大きさを指定します。

const options: google.maps.MapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
}

const libraries: Libraries = ["places"]

export const MyGoogleMap: React.FC = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey ?? "",
    libraries,
  })
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  if (loadError) return <p>Error</p>
  if (!isLoaded) return <p>Loading...</p>

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={16} // デフォルトズーム倍率を指定します。
      clickableIcons={false}
      // center={props.origin}
      options={options}
      onLoad={onMapLoad}
    >
      {props.children}
    </GoogleMap>
  )
}
