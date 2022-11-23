import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import FieldError from 'components/ui/FieldError'
import { ProfileRole } from 'data/intefaces/IProfile'
import classNames from 'classnames'

interface Props {
  
}

interface ItemProps {
  role: ProfileRole
}

export default function ModeField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error

  const Item = (props: ItemProps) => {

    const getClass = (role: ProfileRole) => {
      return classNames(
        {
          [styles.master]: role === ProfileRole.Master,
          [styles.volunteer]: role === ProfileRole.Volunteer,
          [styles.client]: role === ProfileRole.Client
        }
      )
    }
    return (
      <div className={classNames(styles.item, getClass(props.role))}>
        
      </div>
    )
  }

  return (
    <div className={styles.root}>
      
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
