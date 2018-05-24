import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FiltroFichadownShiftMultiple from './FiltroFichadownShiftMultiple'


const styles = theme => ({
  root: {
      flexGrow: 1,
       marginTop:50,
      //height: 250,
  },
  container: {
      flexGrow: 1,
      position: 'relative',
  },
  paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
  },
  chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
      flexWrap: 'wrap',
  },
});

function AutocompleteFiltroTipo(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <FiltroFichadownShiftMultiple classes={classes} />
    </div>
  );
}

AutocompleteFiltroTipo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutocompleteFiltroTipo);