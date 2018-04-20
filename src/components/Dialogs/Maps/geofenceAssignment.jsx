import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Close } from 'material-ui-icons';
import Slide from 'material-ui/transitions/Slide';
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import GeofencesRadioButtons from './Components/geofencesRadioButtons'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


const GeofenceAssignment = (props) => {

    const { classes, handleToggleGeofenceAssignment, geofences, radioChange, radioButtonValue } = props;

    return (
        <Dialog
            fullScreen
            open={props.visibility}
            transition={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={handleToggleGeofenceAssignment} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Asignar vehiculos a Geocercas
                    </Typography>
                    <Button color="inherit">
                        Guardar Cambios
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container
                spacing={0}
                alignItems='flex-start'
                direction='row'
                justify='flex-start'
            >
            {/* radiobuttons de las geocercas existentes */}
                <Grid item xs={6}>
                    <Grid container justify='center' direction='column' alignItems='center'>
                        <Grid item>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Geocercas
                    </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset" required className={classes.formControl}>
                                <FormLabel component="legend">Escoja una geocerca para asignarle vehiculos</FormLabel>


                                {geofences.length > 0 && <GeofencesRadioButtons classes={classes} radioButtonValue={radioButtonValue} radioChange={radioChange} geofences={geofences} />}


                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>

                {/* vehiculos dependiendo de la geocerca */}
                <Grid item xs={6}>
                    <Grid container justify='center'>
                        <Grid item>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Vehiculos
                    </Typography>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Assign responsibility</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color='primary'
                                                    value="gilad"
                                                />
                                            }
                                            label="Gilad Gray"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default withStyles(styles)(GeofenceAssignment)