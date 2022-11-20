import styles from './index.module.scss'
import {useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import {usePopper} from 'react-popper'
import {listenForOutsideClicks} from 'components/hooks/useDetectOutsideClick'
import {useAppContext} from 'context/state'

interface Props {
  info: string
  className?: string
}



export default function QuestionPopover(props: Props) {
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',
    placement: 'right',
    modifiers: [
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [appContext.isMobile ? 8 : 13, 0],
        },
      },

    ]
  })
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))
  return (
    <div ref={dropdownRef} className={classNames(styles.root,  props.className)}>
      <div ref={setReferenceElement} className={styles.inner} onClick={() => setIsActive(!isActive)}>
        <Image src='/img/icons/question.svg' width={20} height={20}/>
      </div>
      <div className={classNames({[styles.dropDown]: true, [styles.opened]: isActive})} ref={setPopperElement} style={popperStyles.popper}  {...attributes.popper}>{props.info}
      </div>
    </div>


  )
}
