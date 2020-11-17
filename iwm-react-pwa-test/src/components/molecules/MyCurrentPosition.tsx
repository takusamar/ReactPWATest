import { Marker } from "@react-google-maps/api"
import React, { useEffect, useState } from "react"

export const MyCurrentPosition = () => {
  const [curPos, setCurPos] = useState<google.maps.LatLng | null>(null)
  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (
            curPos === null ||
            curPos.lat() !== pos.coords.latitude ||
            curPos.lng() !== pos.coords.longitude
          ) {
            const newPos = new google.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            )
            setCurPos(newPos)
          }
        },
        (err) => console.log(err)
      )
    }, 1000)
    // eslint-disable-next-line
  }, [])

  console.log(curPos?.lat(), curPos?.lng())
  return curPos ? <Marker position={curPos} /> : null
}
