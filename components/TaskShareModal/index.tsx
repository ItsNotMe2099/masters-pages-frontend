import { modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'
import {useTranslation, Trans} from "i18n";

import { useSelector, useDispatch } from 'react-redux'
import Input from 'components/ui/Inputs/Input'
import {useState} from 'react'
interface Props {
  isOpen: boolean,
}
const TaskShareModal = ({isOpen}: Props) => {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.taskSearch.currentTask)
  const {t} = useTranslation('common')
  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + "//" + window?.location.host : ''}/task/${task?.id}`;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    const textField = document.createElement('textarea')
    textField.innerText = shareUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  return (
    <Modal isOpen={isOpen}  onRequestClose={() => dispatch(modalClose())}>
      <div>{task.title}</div>
      <Input   icon={<img className={styles.copy} onClick={handleCopy} src={'/img/icons/copy.svg'}/>}  input={{value: shareUrl}} labelType={'static'} type={'text'}/>
      {isCopied && <div className={styles.tip}>{t('personalLink.linkWas')}</div>}

    </Modal>
  )
}

export default TaskShareModal
