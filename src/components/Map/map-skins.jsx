import React from 'react'
import {
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import {DrawingManager} from 'react-google-maps/lib/components/drawing/DrawingManager'
import DevicesList from './Markers/devicesList'
import PolygonGeofences from './Polygons/polygon'



export const LocationGreenSkinMap =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={props.defaultCenter}
      defaultOptions={{
        streetViewControl: false,
        scrollwheel: true,
        zoomControl: false,
        mapTypeControlOptions: {
          style: props.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: props.google.maps.ControlPosition.RIGHT_CENTER
        },
        fullscreenControlOptions: {
          position: props.google.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <DevicesList google={props.google} onClick={props.onClick} isOpen={props.isOpen} devices={props.devices} iconAddress={props.iconAddress} />
     { props.paths.length > 0 && <PolygonGeofences google={props.google} paths={props.paths}/>}
    </GoogleMap>
  ))

export const GeofenceGreenSkinMap =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={props.defaultCenter}
      defaultOptions={{
        streetViewControl: false,
        scrollwheel: true,
        zoomControl: false,
        mapTypeControl: false,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
{ props.isDrawingGeofences &&
      <DrawingManager
        onOverlayComplete={props.handleOverlayComplete}
        defaultDrawingMode={props.google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={
          {
            drawingControl: props.google.maps.drawing.OverlayType.POLYLINE,
            drawingControlOptions: {
              position: props.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                 props.google.maps.drawing.OverlayType.POLYGON,
                 props.google.maps.drawing.OverlayType.POLYLINE
              ],
            },
            polygonOptions:{
              fillColor: '#199ee0',
              fillOpacity: 0.2,
              strokeWeight: 2,
              strokeColor: '#113460',
              clickable: true,
              draggable: true,
              editable: true,
              zIndex: 1
              },
              polylineOptions:{
                strokeColor: '#FF0000',
                strokeOpacity: 0.50,
                strokeWeight: 12,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1
                }
          }
        }
        
      />
    }
    </GoogleMap>
  ))
