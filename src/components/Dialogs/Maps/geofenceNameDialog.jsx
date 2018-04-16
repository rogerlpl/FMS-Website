import React from 'react'

import  {  Button } from "material-ui";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from 'material-ui/Dialog';
  
  import TextField from 'material-ui/TextField';
  

const GeofenceNameDialog = (props) => (
    <Dialog
        open={props.dialogVisibility}
        onClose={props.handleOnClose}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">{"Proceso de guardado de geocercas"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Inserte el nombre de la geocerca
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                id="geofenceName"
                label="Nombre Geocerca"
                onChange={props.handleGeofenceName}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleSaveGeofence} color="primary" >
                Guardar
                    </Button>
        </DialogActions>
    </Dialog>
)

export default GeofenceNameDialog;