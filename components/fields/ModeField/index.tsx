import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import FieldError from 'components/ui/FieldError'
import { ProfileRole } from 'data/intefaces/IProfile'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import NextSvg from 'components/svg/NextSvg'
import { getImage } from 'utils/profileRole'

interface Props {
  onClick: () => void
}

interface ItemProps {
  role: ProfileRole
  onClick: () => void
}

export default function ModeField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error
  const { setFieldValue } = useFormikContext()

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
      <div className=
      {classNames(styles.item, getClass(props.role), {[styles.chosen]: field.value === props.role})} 
      onClick={() => setFieldValue(field.name, props.role)}>
        <div className={styles.img}>
          {(field.value !== props.role && field.value) ? 
          <div className={styles.opacity}></div> : null}
          <img src={getImage(props.role)} alt=''/>
        </div>
        <Button className={classNames(styles.btn, {[styles.active]: field.value === props.role})}
          disabled={!field.value || field.value !== props.role}
          onClick={props.onClick}
        >
          {props.role} mode <NextSvg/>
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Item role={ProfileRole.Master} onClick={props.onClick}/>
      <Item role={ProfileRole.Client} onClick={props.onClick}/>
      <Item role={ProfileRole.Volunteer} onClick={props.onClick}/>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
