import { createTextMask } from "redux-form-input-masks";

export const maskBirthDate = createTextMask({
  pattern: '99/99/9999',
  allowEmpty: true,
  stripMask: false,
});
