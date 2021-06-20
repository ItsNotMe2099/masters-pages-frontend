import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'

let SaveProfileSearchForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profileFeedback.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <Field
        name="name"
        label="Name:"
        component={Input}
        size={'small'}
      labelType='static'
      />

      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4>CANCEL</Button>
        <Button red bold smallFont size="10px 85px">SAVE</Button>
      </div>
    </form>
  )
}

SaveProfileSearchForm = reduxForm ({
  form: 'SaveProfileSearchForm',
}) (SaveProfileSearchForm)

export default SaveProfileSearchForm
