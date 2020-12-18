import { useRef, useState } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import styles from './index.module.scss'
import cx from 'classnames'

interface TabOption {
  name: string,
  link?: string,
  key: string
}

interface Props {
  tabs: TabOption[]
}

export const TabSelect = (props: Props) => {
  const dropdownRef = useRef(null);
  const {tabs} = props
  const [selected, setSelected] = useState([tabs[0]])
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const handleOptionClick = (item) => {
    console.log(item)
    setSelected(selected => selected[0] = item)
  }


  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger)}>{selected}</a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
         {tabs.map(item => 
         <ul>
           <li onClick={handleOptionClick}>{item}</li>
         </ul>
         )
        }
       </nav>
    </div>
  );
};
