import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Checkbox from 'components/ui/Inputs/Checkbox'
import Input from "components/ui/Inputs/Input";
import { Field, reduxForm } from 'redux-form'
import { required } from "utils/validations";
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import InputCategory from 'components/ui/Inputs/InputCategory';
import CheckboxSubCategory from 'components/ui/Form/MasterProfile/CheckboxSubCategory';

let MasterForm = props => {
  const { handleSubmit } = props
  console.log(`props: ${props}`)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>1. Personal information</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="firstName"
                component={Input}
                label="First name*"
                validate={required}
              />
              <Field
                name="birth"
                component={Input}
                label="BOD* MM / DD / YYYY"
                validate={required}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="lastName"
                component={Input}
                label="Last name*"
                validate={required}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label="Location*"
                validate={required}
              />
            </div>
          </div>
          <div className={styles.title__top}>3. Choose categories</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Nunc dictum duis risus imperdiet</div>
              <div className={styles.inputContainer}>
              <Field
                name="categoryId"
                component={InputCategory}
                label="Choose category"
                validate={required}
              />
              </div>
            </div>
          </div>
          <CheckboxSubCategory/>
        </div>
        <div className={styles.important}>
          <div className={styles.head}>Important information</div>
          <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id quam at lacinia integer cursus venenatis fringilla arcu eget. Sed fames sed praesent cursus ornare fermentum. Fusce varius quisque</div>
          <div className={styles.text__bottom}>dolor elementum neque tellus vivamus nunc. Sodales integer aenean vestibulum</div>
        </div>
        </div>
        <div className={styles.container__checkbox}>
        <div className={styles.border}></div>
        <div className={styles.terms}>
            <Field
              name="terms"
              component={Checkbox}
            ><span>С правилами сайта ознакомился и согласен</span>
            </Field>
        </div>
        <div className={styles.btnContainer}>
            <Button red size="14px 105px">ГОТОВО</Button>
          </div>
        </div>
      </form>
  )
}

MasterForm = reduxForm ({
  form: 'masterForm',
}) (MasterForm)

export default MasterForm
