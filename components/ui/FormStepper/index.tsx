import styles from './index.module.scss'
import {IFormStep} from 'types/types'
import { Line } from 'rc-progress'
import Spacer from 'components/ui/Spacer'
import classNames from 'classnames'
interface Props<S> {
  steps: IFormStep<S>[]
  index: number
  total: number
  className?: string
}

export default function FormStepper<S>(props: Props<S>) {
  const step = props.steps[props.index]
  return <div className={classNames(styles.root, props.className)}>
    {step.name && <div className={styles.title}>{step.name}</div>}
    {step.description && step.description !== step.name && <><Spacer basis={8}/><div className={styles.description}>{step.description}</div></>}
    {step.description && <Spacer basis={8}/>}
    <Line className={styles.progress} percent={((props.index + 1)/props.total) * 100} trailWidth={1.5} strokeWidth={1.5} strokeColor={'red'} trailColor={'grey'} />
  </div>
}

