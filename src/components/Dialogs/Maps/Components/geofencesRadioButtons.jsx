import React from "react";
import Radio, { RadioGroup } from 'material-ui/Radio';
import {
  FormControlLabel,
} from 'material-ui/Form';

const GeofencesRadioButtons = (props) => {

    

    return <RadioGroup
        aria-label="geofences"
        name="geofences"
        className={props.classes.group}
        value={props.radioButtonValue.toString()}
        onChange={props.radioChange}
      >
        {props.geofences.length > 0 ?
          props.geofences.map(geofence => (
          <FormControlLabel
            value={geofence.id.toString()}
            control={<Radio color='primary' />}
            label={geofence.name}
            key={geofence.id}
          /> ))
          :'Las geocercas no se han inicializado'
        }
      </RadioGroup>
    

}

export default GeofencesRadioButtons