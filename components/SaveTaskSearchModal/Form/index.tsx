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
import TextArea from 'components/ui/Inputs/TextArea';
import FileInput from 'components/ui/Inputs/FilesUploadInput';
import {useTranslation} from "i18n";

let SaveTaskSearchForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profileFeedback.formError)
  const { t } = useTranslation('common');

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <Field
        name="name"
        label={t('saveProfileSearchModal.form.name')}
        component={Input}
        size={'small'}
      labelType='static'
      />

      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4>{t('cancelLarge')}</Button>
        <Button red bold smallFont size="10px 85px">{t('saveLarge')}</Button>
      </div>
    </form>
  )
}

SaveTaskSearchForm = reduxForm ({
  form: 'SaveTaskSearchForm',
}) (SaveTaskSearchForm)

export default SaveTaskSearchForm
