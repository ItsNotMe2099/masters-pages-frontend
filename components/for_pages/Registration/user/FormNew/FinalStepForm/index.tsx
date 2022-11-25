import { ProfileRole } from 'data/intefaces/IProfile'
import styles from './index.module.scss'
import classNames from 'classnames'
import InputCategoryFormField from 'components/fields/InputCategoryFormField'
import TextField from 'components/fields/TextField'
import HiddenXs from 'components/ui/HiddenXS'
import QuestionPopover from 'components/ui/QuestionPopover'
import SwitchField from 'components/fields/SwitchField'
import BackButton from 'components/BackButton'
import Button from 'components/ui/Button'
import NextSvg from 'components/svg/NextSvg'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import { getImage } from 'utils/profileRole'
import { useDispatch } from 'react-redux'
import { modalFormOpen } from 'components/Modal/actions'
import { useFormik, useFormikContext } from 'formik'


interface Props {
  role: ProfileRole
  onBackClick: () => void
}

export default function FinalStepForm (props: Props) {

  const getClass = (role: ProfileRole) => {
    return classNames(
      {
        [styles?.master]: role === ProfileRole.Master,
        [styles?.volunteer]: role === ProfileRole.Volunteer,
        [styles?.client]: role === ProfileRole.Client
      }
    )
  }

  const { setFieldValue } = useFormikContext()

  const dispatch = useDispatch()

  return (
    <div className={classNames(styles.final, getClass(props.role))}>
      <div className={styles.illustration}><img src={getImage(props.role)} alt=''/></div>
      <div className={styles.label}>{props.role} mode</div>
      {props.role !== ProfileRole.Client ?
        <div className={styles.id}>
          <InputCategoryFormField setFieldValue={(id) => setFieldValue('id', id)} label='Profile' name='categories' validate={Validator.categories}/>
          <HiddenXs>
          <QuestionPopover info={'You can keep your activities in one GENERAL profile or you can add additional profiles for each professional category that you prefer to distinguish with separate descriptions and statistics. We suggest to start with the "general" profile and add new additional profiles later when needed in the PROFILE menu.'} 
          className={styles.question}/></HiddenXs>
        </div> : null
      }
      <div className={styles.id}>
        <TextField 
          editable
          onClick={() => dispatch(modalFormOpen())}
          className={styles.altField} 
          name='id' label='MastersPages.com ID' labelType={LabelStyleType.Cross} validate={Validator.required}/>
        <HiddenXs>
          <QuestionPopover info={'It will become your address in the format http://www.masterspages.com/orgid'} 
          className={styles.question}/></HiddenXs>
      </div>
      <SwitchField name='searchable' label='Searchable' className={styles.switch}/>
      <div className={styles.btns}>
        <BackButton onClick={props.onBackClick} role={props.role}/>
        <Button
          className=
          {classNames(styles.btn)}>
              Create profile<NextSvg/>
        </Button>
      </div>
    </div>
    
  )
}
