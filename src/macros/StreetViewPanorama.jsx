import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import invariant from "invariant"
import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from "../utils/MapChildHelper"
import { MAP } from "../constants"

const StreetViewPanorama = props => {
  const mapContext = useContext(MAP)

  useEffect(
    () => {
      invariant(
        !!mapContext,
        `Did you render <StreetViewPanorama> as a child of <GoogleMap> with withGoogleMap() HOC?`
      )

      const streetViewPanorama = mapContext.getStreetView()
      construct(
        StreetViewPanorama.propTypes,
        updaterMap,
        props,
        streetViewPanorama
      )

      componentDidMount(StreetViewPanorama, streetViewPanorama, eventMap)

      return () => {
        componentWillUnmount(StreetViewPanorama)
        if (streetViewPanorama) {
          streetViewPanorama.setVisible(false)
        }
      }
    },
    [mapContext, props]
  )

  useEffect(
    () => {
      componentDidUpdate(
        StreetViewPanorama,
        mapContext.getStreetView(),
        eventMap,
        updaterMap,
        props
      )
    },
    [props, mapContext]
  )

  const getChildContext = () => {
    return {
      [MAP]: mapContext.getStreetView(),
    }
  }

  const { children } = props
  return <div>{children}</div>
}

StreetViewPanorama.propTypes = {
  __jscodeshiftPlaceholder__: null,
}

StreetViewPanorama.contextTypes = {
  [MAP]: PropTypes.object,
}

StreetViewPanorama.childContextTypes = {
  [MAP]: PropTypes.object,
}

export default StreetViewPanorama

const eventMap = {}

const updaterMap = {}
