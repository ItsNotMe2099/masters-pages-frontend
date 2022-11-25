import Button from 'components/ui/Button'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  onClick: () => void
  role?: ProfileRole
}

export default function BackButton(props: Props) {

  const getClass = (role: ProfileRole) => {
    return classNames(
      {
        [styles?.master]: role === ProfileRole.Master,
        [styles?.volunteer]: role === ProfileRole.Volunteer,
        [styles?.client]: role === ProfileRole.Client
      }
    )
  }

  return (
    <Button className={classNames(styles.back, getClass(props.role))} type='button' onClick={props.onClick}>
      <img src='/img/Registration/new/corp/prev.svg' alt=''/>
    </Button>
  )
}
