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
    FormHelperText,
} from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';

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

    const { classes, handleToggleGeofenceAssignment } = props;

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
                <Grid item xs={6}>
                    <Grid container justify='center' direction='column' alignItems='center'>
                        <Grid item>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Geocercas
                    </Typography>
                        </Grid>
                        <Grid item>
                        <FormControl component="fieldset" required className={classes.formControl}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            className={classes.group}
                            value='male'
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color='primary'/>} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            <FormControlLabel
                                value="disabled"
                                disabled
                                control={<Radio />}
                                label="(Disabled option)"
                            />
                        </RadioGroup>
                    </FormControl>
                        </Grid>
                    </Grid>
                    
                </Grid>
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
                                <FormHelperText>Be careful</FormHelperText>
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