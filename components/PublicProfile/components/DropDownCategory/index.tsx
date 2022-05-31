import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
interface OptionItem{
  label: string
  value: any
}
interface Props {
  options: OptionItem[]
  item: (item: OptionItem) => ReactElement,
  onChange?: (item) => void,
  value?: any,
}
export const DropDownCategory = (props: Props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const [value, setValue] = useState(props.options[0])

  useEffect(() => {
    if(props.value){
      setValue(props.options.find(item => item.value === props.value))
    }
  }, [props.value, props.options])
  const handleOptionClick = (e, item) => {
    e.preventDefault()
    setValue(item)
    if(props.onChange){
      props.onChange(item)
    }
    setIsActive(false)
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault()
    setIsActive(false)
  }
  return (
    <div className={styles.root}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        {value && props.item(value)}
        <img className={styles.arrow} src={'/img/icons/arrow.svg'} alt=''/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {value &&
          <li className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
            {props.item(value)}
            <img className={styles.arrowActive}
                 src={'/img/icons/arrow_active.svg'}
                 alt=''/></a></li>
          }
          {props.options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}>
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                {props.item(item)}
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  )
}
