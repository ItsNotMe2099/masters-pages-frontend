import styles from 'components/ui/FormStepSwitch/index.module.scss'

interface Props {
  options: React.ReactNode[]
  index: number
}

export default function FormStepSwitch(props: Props) {

  if (!props.options.length) {
    return null
  }

  return (
    <div className={styles.root}>
        {props.options[props.index]}
    </div>
  )
}
