import React from "react";
import { 
    Polygon
  } from "react-google-maps";

 const  PolygonGeofences = (props) => {

    if (props.google) {
      return (
        <Polygon
          path={props.paths}
          onClick={props._onClick}
          key={Date.now() + Math.random()}
          />
        )
    
    }else{
        return 'Google doesnt exist'
    }
  }

  export default PolygonGeofences