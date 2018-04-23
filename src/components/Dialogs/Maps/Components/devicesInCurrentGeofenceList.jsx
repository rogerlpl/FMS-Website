import React from 'react'
import { DirectionsBus } from "material-ui-icons";
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

const DevicesInCurrentGeofenceList = props => {
    const { classes, devices } = props
    return <div className={classes.root}>
        <List>
            {devices.map(device => (
                < ListItem key={device.id}>
                    <Avatar>
                        <DirectionsBus />
                    </Avatar>
                    <ListItemText primary={device.name} secondary={`Numero de Identificacion -> ${device.uniqueid}`} />

                </ListItem>
            ))
            }
        </List>
    </div>
}

export default withStyles(styles)(DevicesInCurrentGeofenceList)