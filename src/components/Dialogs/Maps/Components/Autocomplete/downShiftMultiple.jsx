import React, {Component} from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux'
import * as actions from '../../../../../actions/actions-creators'
import { bindActionCreators } from 'redux'


class DownshiftMultiple extends Component {

    renderInput = (inputProps) => {
        const { InputProps, classes, ref, ...other } = inputProps;

        return (
            <TextField
                InputProps={{
                    inputRef: ref,
                    classes: {
                        root: classes.inputRoot,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        );
    }

    renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || '').indexOf(suggestion.uniqueid) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.uniqueid}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.uniqueid}
            </MenuItem>
        );
    }

    getSuggestions = (inputValue) => {
        let count = 0;

        return this.props.devicesSearch.filter(suggestion => {
            const keep =
                (!inputValue || suggestion.uniqueid.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
                count < 5;

            if (keep) {
                count += 1;
            }

            return keep;
        });
    }

    handleKeyDown = event => {
        const { inputValue, selectedItem } = this.props;
        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.props.actions.keyDownInputGeofenceAssignmentDialog()
        }
    };

    handleInputChange = event => {
        this.props.actions.changeInputGeofenceAssignmentDialog(event.target.value)
    };

    handleChange = item => {
        let { selectedItem } = this.props;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.props.actions.changeDevicesToAddGeofenceAssignmentDialog(selectedItem)
       this.props.actions.deteleTextGeofenceAssignmentDialog()
    };

    handleDelete = item => () => {
        const selectedItem = [...this.props.selectedItem];
        selectedItem.splice(selectedItem.indexOf(item), 1);
        this.props.actions.deleteDeviceToAddGeofenceAssignmentDialog(selectedItem)
    };

    render() {
        const { classes, inputValue, selectedItem } = this.props;

        return (
            <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex,
                }) => (
                        <div className={classes.container}>
                            {this.renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    startAdornment: selectedItem.map(item => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={this.handleDelete(item)}
                                        />
                                    )),
                                    onChange: this.handleInputChange,
                                    onKeyDown: this.handleKeyDown,
                                    placeholder: 'Seleccione los dispositivos a agregar',
                                    id: 'integration-downshift-multiple',
                                }),
                            })}
                            {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {this.getSuggestions(inputValue2).map((suggestion, index) =>
                                        this.renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion.uniqueid }),
                                            highlightedIndex,
                                            selectedItem: selectedItem2,
                                        }),
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    )}
            </Downshift>
        );
    }
}

function mapStateToProps(state, props) {

    return {
        devicesSearch: state.getIn(['geofenceAssignmentDialog', 'addDevicesComponents', 'devicesSearch']),
        selectedItem: state.getIn(['geofenceAssignmentDialog', 'addDevicesComponents', 'devicesToAdd']),
        inputValue: state.getIn(['geofenceAssignmentDialog', 'addDevicesComponents', 'inputValue'])
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DownshiftMultiple)

