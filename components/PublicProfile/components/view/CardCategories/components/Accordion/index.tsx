import styles from './index.module.scss'
import React, {useState, useRef} from 'react'
import ArrowDown from 'components/svg/ArrowDown'

interface Props {
  title: string
  children: any
}

export default function Accordion(props: Props) {

  const [setActive, setActiveState] = useState("")
  const [setHeight, setHeightState] = useState("0px")

  const content = useRef(null)

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "")
    setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`)
  }

  return(
    <div className={styles.root}>
      <a className={`${styles.accordion} ${setActive}`} onClick={toggleAccordion}>
        <p className={styles.accordion__title}>{props.title}</p>
        <ArrowDown/>
      </a>
      <div ref={content} style={{maxHeight: `${setHeight}`}} className={styles.accordion__content}>
        {props.children}
      </div>
    </div>
  )
}
