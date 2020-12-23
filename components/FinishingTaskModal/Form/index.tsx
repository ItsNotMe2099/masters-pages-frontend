import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import Rating from 'components/ui/Inputs/Rating';

let FinishingTaskForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.authSignIn.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}>Work quality :</div>
        <Field
          name="quality"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>Politness :</div>
        <Field
          name="politness"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>Deadlines :</div>
        <Field
          name="deadlines"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>Extra expenses :</div>
        <Field
          name="expenses"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>Reccomend :</div>
        <Field
          name="reccomend"
          component={Rating}
        />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">LOG IN</Button>
      </div>
    </form>
  )
}

FinishingTaskForm = reduxForm ({
  form: 'finishingTask',
}) (FinishingTaskForm)

export default FinishingTaskForm
