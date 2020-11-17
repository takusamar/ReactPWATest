import React, { useState, useCallback } from "react"
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api"

interface OwnProps {
  origin: any
  destination: any
  wayPoints: any[] | undefined
}

export const MyDirection: React.FC<OwnProps> = (props) => {
  const [
    currentDirection,
    setCurrentDirection,
  ] = useState<google.maps.DirectionsResult | null>()
  // ここにDirectionsServiceへのAPIコールで得られたルート情報を保存する

  const directionsCallback = useCallback(
    (googleResponse) => {
      console.log("googleResponse", googleResponse)
      if (googleResponse) {
        if (currentDirection) {
          console.log("currentDirection", currentDirection)
          if (
            googleResponse.status === "OK" &&
            googleResponse.geocoded_waypoints.length !==
              currentDirection.geocoded_waypoints.length
          ) {
            console.log("ルートが変更されたのでstateを更新する")
            setCurrentDirection(googleResponse)
          } else {
            console.log("前回と同じルートのためstateを更新しない")
          }
        } else {
          if (googleResponse.status === "OK") {
            console.log("初めてルートが設定されたため、stateを更新する")
            setCurrentDirection(googleResponse)
          } else {
            console.log("前回と同じルートのためstateを更新しない")
          }
        }
      }
    },
    [currentDirection]
  )
  // (1) DirectionsServiceコンポーネントはレンダーされるとルート検索し、結果をcallbackとして返す。
  // (2) このAPIレスポンスを今回のようにstateに保存すると、stateが変わったことにより、DirecitonsServiceコンポーネントが再度レンダーされる。
  // (3) DirectionsServiceコンポーネントがレンダーされると再度APIコールを行う。
  // 上記(1)~(3)の無限ループを防ぐため、(3)の結果がstateと変わらなければstateを更新しない、という処理を上記に実装した

  return (
    <>
      <DirectionsService
        options={{
          origin: props.origin,
          destination: props.destination,
          travelMode: google.maps.TravelMode.WALKING,
          // 走行モードを指定する
          optimizeWaypoints: true,
          // 経由地の順序を最適化する場合はtrueに設定する
          waypoints: props.wayPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
            suppressMarkers: true,
          }}
        />
        // DirectionsServiceのAPI検索の結果としてcurrenctDirectionがあれば、その結果をDirectionsRendererで表示する。
        // 予めルート情報を持っていれば、DirecitonsServiceでAPIコールする必要はない。
      )}
    </>
  )
}
