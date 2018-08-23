import React, { Component } from 'react'
import { Grid } from "material-ui";
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography'

import InputLabel from 'material-ui/Input/InputLabel';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl'
import Select from 'material-ui/Select';

import BasicDatePicker from '../../components/Datepicker/basicDatePicker.jsx'

import { connect } from 'react-redux'
import * as actions from '../../actions/actions-creators'
import { bindActionCreators } from 'redux'
import jsreport from 'jsreport-browser-client-dist'


const styles = theme => ({
    paperHead: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '80vmax',
    }),
    paperBody: {
        width: '80vmax',
        height: 600,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
});

class Reportes extends Component {
    state = {
        ficha: '',
        ficha2: '',
        open: false,
        open2: false,
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleChange2 = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose2 = () => {
        this.setState({ open2: false });
    };

    handleOpen2 = () => {
        this.setState({ open2: true });
    };

    componentDidMount = () => {
        // this.props.actions.renderReport()
        // jsreport.serverUrl = 'https://imecap.jsreportonline.net/';
        // jsreport.headers['Authorization'] = 'Basic bHIubG9wZXp1bGxvYUBpbWVjYXAuY29tLmRvOmF3bW90M3E1M2Rl'
  

        // const request = {
        //     template: {
        //         name: 'Invoice'
        //     },
        //     options:{
        //       'Content-Disposition' : "inline; filename=myreport.pdf" 
        //     }
        // };

        // jsreport.renderAsync(request).then( (res)=> {
        //     res.export={
        //         filename:'example'
        //     }
        //     this.props.actions.renderReport(res.toObjectURL())
        // });

        // jsreport.render('reportPlaceholder', request);
    }
    render() {
        const { classes } = this.props;

        return (
            <Grid container direction='column' alignItems='center'>
                {/* Header de los reportes */}
                <Grid item xs={12}>
                    <Paper className={classes.paperHead} elevation={4}>
                        <Grid container direction='row' alignItems='center'>
                            <Grid item xs={3}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="controlled-open-select">Tipo de Reporte</InputLabel>
                                    <Select
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        onOpen={this.handleOpen}
                                        value={this.state.ficha}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'ficha',
                                            id: 'controlled-open-select',
                                        }}
                                    >

                                        <MenuItem value="">
                                            <em>Ninguna</em>
                                        </MenuItem>
                                        <MenuItem value={104}>Ver ruta recorrida por una flota</MenuItem>
                                        <MenuItem value={246}>Violaciones de Seguridad</MenuItem>
                                        <MenuItem value={146}>Situaciones de Operaciones</MenuItem>
                                        <MenuItem value={146}>Mal manejo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <BasicDatePicker text='Desde' />
                            </Grid>
                            <Grid item xs={3}>
                                <BasicDatePicker text='Hasta' />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="controlled-open-select2">Categoria de Reporte</InputLabel>
                                    <Select
                                        open={this.state.open2}
                                        onClose={this.handleClose2}
                                        onOpen={this.handleOpen2}
                                        value={this.state.ficha2}
                                        onChange={this.handleChange2}
                                        inputProps={{
                                            name: 'ficha2',
                                            id: 'controlled-open-select2',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Ninguna</em>
                                        </MenuItem>
                                        <MenuItem value={104}>Turismo</MenuItem>
                                        <MenuItem value={246}>Interurbano</MenuItem>
                                        <MenuItem value={146}>Rutas</MenuItem>
                                        <MenuItem value={46}>Ejecutivo</MenuItem>
                                        <MenuItem value={1546}>Todas las Fichas</MenuItem>
                                        <MenuItem value={1476}>Una Ficha en especifico</MenuItem>
                                        <MenuItem value={1496}>Un Chofer en especifico</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* Body de los reportes */}
                <Grid item xs={12}>
                    <Paper className={classes.paperBody} elevation={4}>
                        {/* <embed src={this.props.file} type='application/pdf' width="100%" height="100%" /> */}
                        <div id='reportPlaceholder'  style={{height:"100%"}}>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )

    }
}


function mapStateToProps(state, props) {

    return {
        file: state.getIn(['report', 'file']),

    }

}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reportes))