import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from "../utils/MapChildHelper"
import { MAP, RECTANGLE } from "../constants"

const Rectangle = props => {
  const mapContext = useContext(MAP)
  const rectangleRef = React.useRef(null)

  useEffect(
    () => {
      const rectangle = new google.maps.Rectangle()
      construct(Rectangle.propTypes, updaterMap, props, rectangle)
      rectangle.setMap(mapContext)
      rectangleRef.current = rectangle

      componentDidMount(Rectangle, rectangleRef.current, eventMap)

      return () => {
        componentWillUnmount(Rectangle)
        if (rectangleRef.current) {
          rectangleRef.current.setMap(null)
        }
      }
    },
    [mapContext, props]
  )

  useEffect(
    () => {
      componentDidUpdate(
        Rectangle,
        rectangleRef.current,
        eventMap,
        updaterMap,
        props
      )
    },
    [props]
  )

  return false
}

Rectangle.propTypes = {
  __jscodeshiftPlaceholder__: null,
}

export default Rectangle

const eventMap = {}

const updaterMap = {}
