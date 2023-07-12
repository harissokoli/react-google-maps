import _ from "lodash"
import warning from "warning"
import invariant from "invariant"
import { getDisplayName } from "recompose"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { MAP } from "./constants"

const withGoogleMap = BaseComponent => {
  const factory = React.createFactory(BaseComponent)

  const Container = ({ containerElement, mapElement, ...restProps }) => {
    const [map, setMap] = useState(null)

    useEffect(
      () => {
        invariant(
          !!containerElement && !!mapElement,
          `Required props containerElement or mapElement is missing. You need to provide both of them.
        The \`google.maps.Map\` instance will be initialized on mapElement and it's wrapped by\
        containerElement.\nYou need to provide both of them since Google Map requires the DOM to\
        have height when initialized.`
        )

        const handleComponentMount = node => {
          if (map || node === null) {
            return
          }
          warning(
            `undefined` !== typeof google,
            `Make sure you've put a <script> tag in your <head> element to load Google Maps JavaScript API v3.
          If you're looking for built-in support to load it for you, use the "async/ScriptjsLoader" instead.
          See https://github.com/tomchentw/react-google-maps/pull/168`
          )
          // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
          const newMap = new google.maps.Map(node)
          setMap(newMap)
        }

        handleComponentMount(mapElement)
      },
      [containerElement, mapElement]
    )

    const getChildContext = () => {
      return {
        [MAP]: map,
      }
    }

    return React.cloneElement(
      containerElement,
      {},
      React.cloneElement(mapElement, {
        ref: handleComponentMount,
      }),
      <div>{factory(restProps)}</div>
    )
  }

  Container.displayName = `withGoogleMap(${getDisplayName(BaseComponent)})`
  Container.propTypes = {
    containerElement: PropTypes.node.isRequired,
    mapElement: PropTypes.node.isRequired,
  }
  Container.childContextTypes = {
    [MAP]: PropTypes.object,
  }

  return Container
}

export default withGoogleMap
