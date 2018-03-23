import React from "react";
import {
    IconButton,
    Hidden
} from "material-ui";

import { Directions, AddLocation } from "material-ui-icons";

const divStyle = {
    display: 'inline'
}
const headerButtons = (props) => (
<div style={divStyle}>
        {/* boton para las rutas */}
        <IconButton
            color="inherit"
            aria-label="AddLocation"
            className={props.classes.buttonLink}
        >
            <Directions className={props.classes.links} />
            <Hidden mdUp>
                <p className={props.classes.linkText}>Rutas</p>
            </Hidden>
        </ IconButton>
        {/*boton para las geocercas */}
        <IconButton
            color="inherit"
            aria-label="AddLocation"
            className={props.classes.buttonLink}
        >
            <AddLocation className={props.classes.links} />
            <Hidden mdUp>
                <p className={props.classes.linkText}>Geocercas</p>
            </Hidden>
        </ IconButton>

</div>
)

export default headerButtons