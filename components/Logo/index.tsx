import LogoSvg from 'components/svg/Logo'
import LogoMobileSvg from 'components/svg/LogoMobileSvg'
import Link from 'next/link'
import styles from './index.module.scss'

interface Props {
  color?: string,
  link?: string

}

export default function Logo(props: Props) {
  return (
    <Link href={props.link}>
    <a className={styles.root}>

            <LogoSvg className={styles.iconDesktop} color={props.color}/>
            <LogoMobileSvg className={styles.iconMobile} color={props.color}/>
            <div className={`${styles.logoText}`} style={{...(props.color ? {color: props.color} : {})}}>Masters <span style={{...(props.color ? {color: props.color} : {})}}>Pages</span></div>

        </a>
    </Link>
  )
}
Logo.defaultProps = {
  link: '/'
}
