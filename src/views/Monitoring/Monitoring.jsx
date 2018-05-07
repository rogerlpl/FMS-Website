import React, { Component } from 'react'
import Grid from 'material-ui/Grid';
import MonitoringMap from './Components/MonitoringMap'
import Bus from '../../assets/img/bus-marker.png'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Player from './Components/Player'
import AutocompleteFiltroTipo from './Components/Autocomplete/FiltroTipo/AutocompleteFiltroTipo'
import AutocompleteFiltroFicha from './Components/Autocomplete/FiltroFicha/AutocompleteFiltroFicha'
import "./Components/video-react.css"; // import css
const styles = theme => ({

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    text: {
        display: 'inline-block'
    }
});

class Monitoring extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction='row' justify='center' alignItems='flex-start'>

                <Grid item xs={6}>
                    <Grid container direction='column' justify='flex-start' >

                        <Grid item xs={12} >
                            <Paper style={{ height: 200, width: '100%' }} elevation={4}>
                                <form noValidate autoComplete="off">
                                    <Grid container direction='column' justify="center" alignItems='center' spacing={8}>
                                        <Grid container direction='row' justify='center' alignItems='center' spacing={8}>
                                            <Grid item xs={12} sm={3}>
                                                <AutocompleteFiltroTipo className={classes.textField} />
                                            </Grid>
                                            <Grid item >
                                                <AutocompleteFiltroFicha />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row' justify='center' alignItems='center' spacing={8}>
                                            <Grid item>
                                                <TextField
                                                    id="canalNumbers"
                                                    label="Número de Canales"
                                                    type="number"
                                                    margin="normal"
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{ height: 600, width: '100%' }} elevation={4}>

                                <MonitoringMap
                                    iconAddress={Bus}
                                    defaultCenter={{ lat: 18.555353, lng: -70.8627778 }}
                                />
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={6}>

                    <Paper style={{ height: 815, width: '100%', float: 'right' }} elevation={4} >





                        <Grid container direction='row'  justify='center' alignItems='center'>
                            <Player />
                            <Player />
                            <Player />
                            <Player />
                        </Grid>

                    </Paper>
                </Grid>

            </Grid>
        )
    }
}

export default withStyles(styles)(Monitoring)