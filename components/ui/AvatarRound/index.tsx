import Modal from "components/ui/Modal";
import { IChat } from "types";
import styles from './index.module.scss'

interface Props {
  image?: string
  name?: string
}

export default function AvatarRound(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        {!props.image && props.name && (
          <div className={styles.name}>
            {props.name && props.name.substr ? props.name.substr(0, 1).toUpperCase() : null}
          </div>
        )}
      </div>
    </div>
  )
}
