import { modalClose } from 'components/Modal/actions'
import {
  createSkillCategory,
  resetSkillForm
} from 'components/Skill/actions'
import Modal from 'components/ui/Modal'
import CategoryForm from 'components/Portfolio/CategoryForm'
import { useEffect } from 'react'
import * as React from 'react'
import { IRootState } from 'types'
import styles from 'components/Portfolio/CategoryModal/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from 'next-i18next'

interface Props {
  isOpen: boolean,
  onClose: () => void
}
const CategoryModal = ({isOpen, onClose}: Props) => {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch()
  const {t} = useTranslation('common')
  useEffect(() => {
    if(isOpen){
      dispatch(resetSkillForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    dispatch(createSkillCategory(data))
  }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={'/img/icons/plus.svg'}/>
        </div>
        <div className={styles.title}>{t('portfolio.addCategory')}</div>
      </div>
      <div className={styles.separator}></div>
      <CategoryForm onSubmit={handleSubmit} onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default CategoryModal
