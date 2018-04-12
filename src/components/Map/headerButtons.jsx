import React from "react";
import {
    IconButton,
    Hidden
} from "material-ui";

import { Directions, RemoveRedEye } from "material-ui-icons";

const divStyle = {
    display: 'inline'
}
const headerButtons = (props) => (
<div style={divStyle}>
        {/* boton para crear geocercas */}
        <IconButton
            color="inherit"
            aria-label="Crear Geocercas"
            className={props.classes.buttonLink}
            onClick={props.handleToggleGeofenceModal}
        >
            <Directions className={props.classes.links} />
            <Hidden mdUp>
                <p className={props.classes.linkText}>Rutas</p>
            </Hidden>
        </ IconButton>
        {/*boton para ver las geocercas */}
        <IconButton
            color="inherit"
            aria-label="Ver Geocercas"
            className={props.classes.buttonLink}
        >
            <RemoveRedEye className={props.classes.links} />
            <Hidden mdUp>
                <p className={props.classes.linkText}>Geocercas</p>
            </Hidden>
        </ IconButton>

</div>
)

export default headerButtons