import React, { Component } from 'react'
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
      },
});

class Conductores extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                    <RegularCard
                        headerColor="green"
                        cardTitle="Registrar conductor"
                        content={
                            <form className={classes.container} noValidate autoComplete="off">
                                <Grid container>
                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <TextField
                                            id="nombres"
                                            label="Nombres"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="apellidos"
                                            label="Apellidos"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <TextField
                                            id="cedula"
                                            label="Cedula"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="Licencia"
                                            label="No. Licencia"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Button variant="raised" color="primary" className={classes.button}>
                                            Registrar
                                        </Button>
                                    </ItemGrid>
                                </Grid>



                            </form>
                        }
                    />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                    <RegularCard
                        headerColor="orange"
                        cardTitle="Ultimos conductores registrados"
                        content={
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["Nombres", "Apellidos", "Cedula", "No. Licencia"]}
                                tableData={[
                                    [ 'Ardella Almeida', 'Carhué','4563212365', '541514514'],
                                    [ 'Elliot Causon', 'Tshikapa','4563212365', '541514514'],
                                    ['Emmeline Degoy', 'Pilcuyo','4563212365', '541514514'],
                                    ['Gabbie Knowler', 'Jadowniki','4563212365', '541514514']
                                ]}
                            />
                        }
                    />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        headerColor="red"
                        cardTitle="Ultimos incidentes de conductores"
                        content={
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["ID", "Fecha", "Ficha", "Chofer", "Zona", "Tipo de Violacion"]}
                                tableData={[
                                    ['1', '5/2/2018 14:22:27', '156', 'Ardella Almeida', 'Carhué', 'Salida de Ruta'],
                                    ['2', '5/2/2018 11:55:13', '289', 'Elliot Causon', 'Tshikapa', 'Retraso en el Arribo'],
                                    ["3", '5/2/2018 4:25:27', '893', 'Emmeline Degoy', 'Pilcuyo', 'Parada Fuera de Lugar'],
                                    ["4", '5/2/2018 5:12:17', '414', 'Gabbie Knowler', 'Jadowniki', 'Salida de Ruta']
                                ]}
                            />
                        }
                    />
                </ItemGrid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Conductores)