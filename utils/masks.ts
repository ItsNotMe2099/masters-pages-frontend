import {createTextMask} from "redux-form-input-masks";
import {format, parse} from 'date-fns'
import * as React from 'react'

export const maskBirthDate = createTextMask({
  pattern: '99/99/9999',
  allowEmpty: true,
  stripMask: false,
});

export const dateFormat = {
  format: (value) => {
    if(value) {
      try {
       return format(parse(value, 'yyyy-mm-dd', new Date()), 'mm/dd/yyyy')
      } catch (e) {

      }
      return value;
    }
    return ''},
  parse: (value) => {
    try {
      return value ? format(parse(value, 'mm/dd/yyyy', new Date()), 'yyyy-mm-dd') : null
    }catch (e){

      return  value;
    }
  }
}
