import React from "react";
import imagen from '../../assets/img/pagina-en-mantenimiento.jpg'
import Grid from 'material-ui/Grid';
function Mantenimiento({ ...props }) {
    return (
        <Grid container justify='center' direction='row' alignItems='center'>
            <Grid item>
                <img src={imagen} alt='Mantenimiento' />
            </Grid>
        </Grid>
    )
}


export default Mantenimiento;
