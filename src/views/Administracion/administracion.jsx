import React, { Component } from 'react'
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import AutocompleteFiltroRoles from './Autocomplete/FiltroRole/AutocompleteFiltroRoles'

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

class Administracion extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                    <RegularCard
                        headerColor="green"
                        cardTitle="Crear usuario"
                        content={
                            <form className={classes.container} noValidate autoComplete="off">
                                <Grid container>
                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <TextField
                                            id="usuario"
                                            label="Nombre de usuario"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="email"
                                            label="Email"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Contraseña"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="confirmpassword"
                                            label="Confirmar contraseña"
                                            type="password"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <AutocompleteFiltroRoles />
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
                        headerColor="green"
                        cardTitle="Usuarios Conectados"
                        content={
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["Nombre", "Email"]}
                                tableData={[
                                    ['Ardella Almeida', 'Carhué'],
                                    ['Elliot Causon', 'Tshikapa'],
                                    ['Emmeline Degoy', 'Pilcuyo'],
                                    ['Gabbie Knowler', 'Jadowniki']
                                ]}
                            />
                        }
                    />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        headerColor="green"
                        cardTitle="Horarios de las Rutas"
                        content={
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["Ficha", "Salida", "Destino", "Hora de Salida", "Hora de Llegada", "Chofer"]}
                                tableData={[
                                    ['156', 'Santo Domingo', 'Santiago', '14:22:27', '14:22:27', 'Ardella Almeida'],
                                    ['289', 'Santo Domingo', 'Samana', '11:55:13', '11:55:13', 'Elliot Causon',],
                                    ["893", 'Santo Domingo', 'Barahona', '4:25:27', '4:25:27', 'Emmeline Degoy',],
                                    ["414", 'Santo Domingo', 'Puerto Plata', '5:12:17', '5:12:17', 'Gabbie Knowler',]
                                ]}
                            />
                        }
                    />
                </ItemGrid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Administracion)