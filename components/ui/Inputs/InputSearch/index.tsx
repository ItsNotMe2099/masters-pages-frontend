import Button from 'components/ui/Button'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  placeholder?: string
  onChange?: (e) => void
  onClick?: () => void
  searchValue?: string
}

export default function InputSearch(props: Props) {
  const [value, setValue] = useState(props.searchValue)

  const handleSearch = (e) => {
    setValue(e.currentTarget.value)
    props.onChange(e.currentTarget.value)
  }
  return (
    <form className={styles.root}>
      <input
        name="query"
        type="text"
        value={props.searchValue}
        autoComplete={'off'}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
        <Button className={styles.btn} onClick={props.onClick}>
          <img src="/img/icons/search.svg" alt="" />
        </Button>
    </form>
  )
}
