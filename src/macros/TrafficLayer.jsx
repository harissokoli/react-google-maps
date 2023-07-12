import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from "../utils/MapChildHelper"
import { MAP, TRAFFIC_LAYER } from "../constants"

const TrafficLayer = props => {
  const mapContext = useContext(MAP)
  const trafficLayerRef = React.useRef(null)

  useEffect(
    () => {
      const trafficLayer = new google.maps.TrafficLayer()
      construct(TrafficLayer.propTypes, updaterMap, props, trafficLayer)
      trafficLayer.setMap(mapContext)
      trafficLayerRef.current = trafficLayer

      componentDidMount(TrafficLayer, trafficLayerRef.current, eventMap)

      return () => {
        componentWillUnmount(TrafficLayer)
        if (trafficLayerRef.current) {
          trafficLayerRef.current.setMap(null)
        }
      }
    },
    [mapContext, props]
  )

  useEffect(
    () => {
      componentDidUpdate(
        TrafficLayer,
        trafficLayerRef.current,
        eventMap,
        updaterMap,
        props
      )
    },
    [props]
  )

  return false
}

TrafficLayer.propTypes = {
  __jscodeshiftPlaceholder__: null,
}

export default TrafficLayer

const eventMap = {}

const updaterMap = {}
