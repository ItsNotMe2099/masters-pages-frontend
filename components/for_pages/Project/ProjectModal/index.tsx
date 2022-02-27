import Modal from 'components/ui/Modal'
import * as React from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import {IProject} from 'data/intefaces/IProject'

interface Props {
  isOpen: boolean,
  project?: IProject,
  onClose: () => void
}
const ProjectModal = ({isOpen, project, onClose}: Props) => {
  const dispatch = useDispatch()

  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      dsdsd

    </Modal>
  )
}

export default ProjectModal
