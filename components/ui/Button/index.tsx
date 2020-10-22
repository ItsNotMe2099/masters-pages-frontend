import styles from './index.module.scss'

interface Props {
  largeHeader?: boolean
  blue?: boolean
  green?: boolean
  smallHeader?: boolean
  largeInput?: boolean
  largeInputSign?: boolean
  largeInputSignUp?: boolean
  categoryBtn?: boolean
  footerBtn?: boolean
  closeBtn?: boolean
  registrationBtn?: boolean
  resetPWBtn?: boolean
  setNewPWBtn?: boolean
  children?: any
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
      <button 
      onClick={props.onClick}
      className={`
       ${styles.root}
       ${props.largeHeader && styles.largeHeader}
       ${props.smallHeader && styles.smallHeader}
       ${props.largeInput && styles.largeInput}
       ${props.categoryBtn && styles.categoryBtn}
       ${props.footerBtn && styles.footerBtn}
       ${props.blue && styles.blue}
       ${props.green && styles.green}
       ${props.closeBtn && styles.closeBtn}
       ${props.largeInputSign && styles.largeInputSign}
       ${props.largeInputSignUp && styles.largeInputSignUp}
       ${props.registrationBtn && styles.registrationBtn}
       ${props.resetPWBtn && styles.resetPWBtn}
       ${props.setNewPWBtn && styles.setNewPw}
      `}>
        {props.children}
      </button>
  )
}
