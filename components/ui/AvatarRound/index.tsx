import Modal from "components/ui/Modal";
import { IChat } from "types";
import styles from './index.module.scss'
import {getMediaPath} from "../../../utils/media";

interface Props {
  image?: string
  name?: string
  size?: string
}

export default function AvatarRound(props: Props) {
  return (
    <div className={`${styles.root} ${props.size === 'large' && styles.rootLarge}`}>
      <div className={styles.image}>
        {props.image && <img src={getMediaPath(props.image)}/>}
        {!props.image && props.name && (
          <div className={styles.name}>
            {props.name && props.name.substr ? props.name.substr(0, 1).toUpperCase() : null}
          </div>
        )}
      </div>
    </div>
  )
}
AvatarRound.defaultProps = {
  size: 'small'
}
