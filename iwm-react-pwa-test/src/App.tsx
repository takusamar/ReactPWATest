import React, { useEffect, useState } from "react"
import "./App.css"
import { MyCurrentPosition } from "./components/molecules/MyCurrentPosition"
import { MyDirection } from "./components/molecules/MyDirection"
import { MyGoogleMap } from "./components/organisms/MyGoogleMap"

function App() {
  const [curPos, setCurPos] = useState<any>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setCurPos(newPos)
      },
      (err) => console.log(err)
    )
    console.log(curPos)
    // eslint-disable-next-line
  }, [])

  if (!curPos) {
    return <div>loading...</div>
  }

  const origin = { lat: curPos.lat, lng: curPos.lng }
  // // 始点を指定する

  const destination = { lat: curPos.lat, lng: curPos.lng + 0.01 }
  // // 終点を指定する

  const wayPoints = [
    { location: { lat: curPos.lat + 0.01, lng: curPos.lng } },
    {
      location: { lat: curPos.lat + 0.01, lng: curPos.lng + 0.01 },
      stopover: true,
    },
  ]
  // 経由地を（順不同で）指定する

  return (
    <div className="App">
      <MyGoogleMap>
        <MyCurrentPosition />
        <MyDirection
          origin={origin}
          destination={destination}
          wayPoints={wayPoints}
        />
      </MyGoogleMap>
    </div>
  )
}

export default App
