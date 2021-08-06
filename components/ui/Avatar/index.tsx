import { signInSubmit } from "components/Auth/SignIn/actions";
import AvatarSvg from "components/svg/AvatarSvg";
import Button from 'components/ui/Button'
import Loader from "components/ui/Loader";
import { createRef, useEffect, useRef } from "react";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames';
import Link from 'next/link'
interface Props {
  size?: 'small' | 'normal' | 'large' | 'exSmall' | 'exExSmall' | 'square' | 'exSquare',
  image?: string
  href?: string
}

export default function Avatar({size, image, href}: Props) {

  const className = cx(styles.root, {
    [styles.exSmall]: size === 'exSmall',
    [styles.exExSmall]:  size === 'exExSmall',
    [styles.square]:  size === 'square',
    [styles.exSquare]:  size === 'exSquare',
    [styles.small]:  size === 'small',
    [styles.normal]:  size === 'normal',
    [styles.large]:  size === 'large',
  });
  const renderImage = () => {
    return  image ? <img src={getMediaPath(image)}/> : <AvatarSvg/>
  }
  if(href){
    return (
      <Link href={href}>
      <a  className={className}>
        {renderImage()}
      </a>
      </Link>
    )
  }else{
    return (
      <div className={className}>
        {renderImage()}
      </div>
    )
  }
}
Avatar.defaultProps = {
  size: 'large'
}
