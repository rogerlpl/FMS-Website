import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Close, Done, Add, Remove } from 'material-ui-icons';
import Slide from 'material-ui/transitions/Slide';
import {
    FormLabel,
    FormControl,
} from 'material-ui/Form';
import GeofencesRadioButtons from './Components/geofencesRadioButtons'
import DevicesInCurrentGeofenceList from './Components/devicesInCurrentGeofenceList'
import IntegrationDownshift from './Components/Autocomplete/integrationDownShift'


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    subheading:
        {
            paddingTop: '20px'
        },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


const GeofenceAssignment = (props) => {

    const { classes,
        handleToggleGeofenceAssignment,
        geofences,
        radioChange,
        radioButtonValue,
        devices,
        visibilityDevicesComponent,
        _toggleDeviceComponents,
        handleSaveDevicesInGeofence,
        selectedItem
    } = props;

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
                    {/* para proximo update con mejor experiencia de usuario
                     <Button color="inherit">
                        Guardar Cambios
                    </Button> */}
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
                                <FormLabel component="legend">Escoja una geocerca para asignarle vehiculos.</FormLabel>


                                {geofences.length > 0 && <GeofencesRadioButtons classes={classes} radioButtonValue={radioButtonValue} radioChange={radioChange} geofences={geofences} />}


                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>
                {/* vehiculos dependiendo de la geocerca */}
                <Grid item xs={6}>
                    <Grid container justify='center' direction='column' alignItems='center'>
                        <Grid item>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Vehiculos
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset" required className={classes.formControl}>
                                <FormLabel component="legend">Presiona el boton de agregar vehiculo para agregarlo a la geocerca.</FormLabel>
                                <Grid container justify='flex-start' direction='row' alignItems='flex-start'>
                                    <Grid item xs={2} className={classes.buttons}>

                                        {radioButtonValue === 0
                                            ?
                                            <Button variant="fab" mini disabled color="primary" aria-label="add" onClick={_toggleDeviceComponents} className={classes.button}>
                                                <Add />
                                            </Button>
                                            :
                                            !visibilityDevicesComponent
                                                ?
                                                <Button variant="fab" mini color="primary" aria-label="add" onClick={_toggleDeviceComponents} className={classes.button}>
                                                    <Add />
                                                </Button>
                                                :
                                                <Button variant="fab" mini color="secondary" aria-label="remove" onClick={_toggleDeviceComponents} className={classes.button}>
                                                    <Remove />
                                                </Button>

                                        }

                                    </Grid>
                                    {visibilityDevicesComponent &&
                                        <Grid item xs={8}>
                                            <IntegrationDownshift />
                                        </Grid>
                                    }
                                    {visibilityDevicesComponent &&
                                        <Grid item xs={2} className={classes.buttons}>
                                            {selectedItem.length > 0
                                                ?
                                                <Button variant="fab" mini color="primary" aria-label="add" onClick={handleSaveDevicesInGeofence} className={classes.button}>
                                                    <Done />
                                                </Button>
                                                :
                                                <Button variant="fab" mini disabled color="primary" aria-label="add" onClick={handleSaveDevicesInGeofence} className={classes.button}>
                                                    <Done />
                                                </Button>
                                            }
                                        </Grid>
                                    }
                                </Grid>
                                <Grid container justify='center' >

                                    {
                                        radioButtonValue === 0
                                            ?
                                            <Typography variant="subheading" color="primary" className={classes.subheading} align='center'>
                                                Selecciona una Geocerca para visualizar los vehiculos que estan asignados a ella.
                                        </Typography>
                                            :
                                            devices.length > 0
                                                ?
                                                <DevicesInCurrentGeofenceList devices={devices} />
                                                :
                                                <Typography variant="subheading" color="primary" className={classes.subheading} align='center'>
                                                    A esta geocerca no se le ha asignado un vehiculo todavía.
                                            </Typography>
                                    }
                                </Grid>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </Dialog >
    )
}

export default withStyles(styles)(GeofenceAssignment)