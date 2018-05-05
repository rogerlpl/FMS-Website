import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
// import { connect } from 'react-redux'
// import * as actions from '../../../../../actions/actions-creators'
// import { bindActionCreators } from 'redux'



const suggestions = [
    { label: '146' },
    { label: '240' },
    { label: '487' },
    { label: '322' },
  ];
  
  function renderInput(inputProps) {
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
  
  function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }
  renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  };
  
  function getSuggestions(inputValue) {
    let count = 0;
  
    return suggestions.filter(suggestion => {
      const keep =
        (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
        count < 5;
  
      if (keep) {
        count += 1;
      }
  
      return keep;
    });
  }
  
  class FiltroFichadownShiftMultiple extends React.Component {
    state = {
      inputValue: '',
      selectedItem: [],
    };
  
    handleKeyDown = event => {
      const { inputValue, selectedItem } = this.state;
      if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
        this.setState({
          selectedItem: selectedItem.slice(0, selectedItem.length - 1),
        });
      }
    };
  
    handleInputChange = event => {
      this.setState({ inputValue: event.target.value });
    };
  
    handleChange = item => {
      let { selectedItem } = this.state;
  
      if (selectedItem.indexOf(item) === -1) {
        selectedItem = [...selectedItem, item];
      }
  
      this.setState({
        inputValue: '',
        selectedItem,
      });
    };
  
    handleDelete = item => () => {
      const selectedItem = [...this.state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
  
      this.setState({ selectedItem });
    };
  
    render() {
      const { classes } = this.props;
      const { inputValue, selectedItem } = this.state;
  
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
              {renderInput({
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
                  placeholder: 'Filtro ficha',
                  id: 'integration-downshift-multiple',
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue2).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
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

// function mapStateToProps(state, props) {

//     return {
//         devicesSearch: state.getIn(['geofences', 'addDevicesComponents', 'devicesSearch']),
//         selectedItem: state.getIn(['geofences', 'addDevicesComponents', 'devicesToAdd']),
//         inputValue: state.getIn(['geofences', 'addDevicesComponents', 'inputValue'])
//     }

// }

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     }
// }
FiltroFichadownShiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(DownshiftMultiple)
export default FiltroFichadownShiftMultiple

