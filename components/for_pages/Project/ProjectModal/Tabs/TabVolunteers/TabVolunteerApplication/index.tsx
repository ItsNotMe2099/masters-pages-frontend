import styles from './index.module.scss'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationPage from 'components/for_pages/Project/ApplicationPage'

import { useAppContext } from 'context/state'
import {IProject} from "data/intefaces/IProject";
import {ApplicationWrapper} from "context/application_state";

interface Props {
  project?: IProject
  application?: IApplication,
  index: number
  total: number
  onNext: () => void,
  onPrev: () => void,
  currentTab: ApplicationStatus
}

const TabVolunteerApplication = (props: Props) => {
  const context = useAppContext()
  const isMobile = context.isMobile
  const hasNext = props.index < props.total
  const hasPrev = props.index > 0
  return (
   <div>
    {(hasPrev || hasNext) &&
    <div className={styles.controls}>
      <div className={styles.prev} onClick={hasPrev ? props.onPrev : null}>
        <img src='/img/icons/back.svg' alt=''/>
        <div className={styles.text}>PREVIOUS {!isMobile && <span>VOLUNTEER</span>}</div>
      </div>
      <div className={styles.next} onClick={hasNext ? props.onNext : null}>
        <div className={styles.text}>NEXT {!isMobile && <span>VOLUNTEER</span>}</div>
        <img src='/img/icons/back.svg' alt=''/>
      </div>
    </div>}
     <ApplicationWrapper application={props.application} applicationId={props.application.id}>
      <ApplicationPage  project={props.project} application={props.application} index={props.index} total={props.total} modal currentTab={props.currentTab}/>
     </ApplicationWrapper>
   </div>)

}

export default TabVolunteerApplication
