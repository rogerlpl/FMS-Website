import React from "react";
import Radio from 'material-ui/Radio';
import {
    FormControlLabel,
} from 'material-ui/Form';

 const  GeofencesRadioButtons = (props) => {
    if(props.geofences.length>0 ){
      return props.geofences.map(geofence => (
        <FormControlLabel 
        value={geofence.id} 
        control={<Radio color='primary'/>} 
        label={geofence.name} 
        />
      ))
    } else {
        return 'Las geocercas no se han inicializado'
    }
  }

  export default GeofencesRadioButtons