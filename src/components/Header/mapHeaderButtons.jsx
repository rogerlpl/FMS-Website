import React from "react";
import {
    IconButton,
    Hidden
} from "material-ui";

import { Directions, RemoveRedEye, Assignment } from "material-ui-icons";
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
        {/* boton para asignar geocercas a dispositivos */}
         <IconButton
            color="inherit"
            aria-label="Asignar Geocercas"
            className={props.classes.buttonLink}
            onClick={props.handleToggleGeofenceAssignment}
        >
            <Assignment className={props.classes.links} />
            <Hidden mdUp>
                <p className={props.classes.linkText}>Asignar Geocercas</p>
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