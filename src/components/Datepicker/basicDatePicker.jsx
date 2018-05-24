import React, {  PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import esLocale from 'date-fns/locale/es';


export default class BasicDatePicker extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;
    return (

      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <DatePicker
            keyboard
            label={this.props.text}
            format="DD/MM/YYYY"
            placeholder="DD/MM/AAAA"
            rightArrowIcon='>'
            leftArrowIcon='<'
            keyboardIcon='📅'
            disableFuture
            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
            value={selectedDate}

            onChange={this.handleDateChange}
            disableOpenOnEnter
            animateYearScrolling={false}
          />
      </MuiPickersUtilsProvider>
      


    );

  }
}