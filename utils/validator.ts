import { FieldValidator } from 'formik/dist/types'
import {isPossiblePhoneNumber} from 'libphonenumber-js'
import { Categories } from 'types/types'

export default class Validator {
  static emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

  static combine(validators: FieldValidator[]): FieldValidator {
    return (value: any) => {
      for (let i = 0; i < validators.length; i++) {
        const err = validators[i](value)
        if (err) {
          return err
        }
      }
      return undefined
    }
  }

  static otpValidation(value: string | number) {
    return !value || `${value}`.length === 4  ? undefined : 'required'
  }

  static required(value: string | number): string | undefined {
    return value || typeof value === 'number' ? undefined : 'required'
  }

  static categories(value: Categories) {
    return value?.subCategory ? undefined : 'required'
  }

  static numberOnly(value: number){
    return value === null || typeof value === 'number' ? undefined : 'Value not a number'
  }

  static minAgeHigherThanMaxAge = (allValues: any) => (value: string): string => {
    return (allValues.minAge < allValues.maxAge || allValues.maxAge === null) ? undefined : 'Min age cannot be higher than max age'
  }

  static email(value: string): string | undefined {
    return value && !Validator.emailRe.test(value)
      ? 'email'
      : undefined
  }

  static passwordsMustMatch = (allValues: any) => (value: string): string | undefined => {
    return value !== allValues.password ? 'Пароли не совпадают' : undefined
  }
  static phone(value: string): string | undefined  {
    console.log("phoneValue", value);
    return !isPossiblePhoneNumber(`${!value?.includes('+') ? '+' : ''}${value}`) ? 'phone' : undefined;
  }

  static validURL(str: string): string | undefined {
    var pattern = new RegExp(
      "^" +
        // protocol identifier (optional)
        // short syntax // still required
        "(?:(?:(?:https?|ftp):)?\\/\\/)" +
        // user:pass BasicAuth (optional)
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broadcast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host & domain names, may end with dot
          // can be replaced by a shortest alternative
          // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
          "(?:" +
            "(?:" +
              "[a-z0-9\\u00a1-\\uffff]" +
              "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
            ")?" +
            "[a-z0-9\\u00a1-\\uffff]\\." +
          ")+" +
          // TLD identifier name, may end with dot
          "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
        ")" +
        // port number (optional)
        "(?::\\d{2,5})?" +
        // resource path (optional)
        "(?:[/?#]\\S*)?" +
      "$", "i"
    );
    return (pattern.test(str) || !str) ? undefined : 'link'
  }

}
