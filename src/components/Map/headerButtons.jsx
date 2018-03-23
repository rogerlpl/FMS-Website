import React from "react";
import {
  IconButton,
  Hidden
} from "material-ui";

import { AddLocation} from "material-ui-icons";


const headerButtons = (props) => (
    // boton para las geocercas
    <IconButton
    color="inherit"
    aria-label="AddLocation"
    className={props.classes.buttonLink}
   >
     <AddLocation className={props.classes.links}/>
     <Hidden mdUp>
       <p className={props.classes.linkText}>Geocercas</p>
       </Hidden>
     </ IconButton>

)

export default headerButtons