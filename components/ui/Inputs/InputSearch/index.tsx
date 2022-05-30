import Button from 'components/ui/Button'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  placeholder?: string
  onChange?: (value) => void
  onClick?: () => void
  searchValue?: string
}

export default function InputSearch(props: Props) {
  const [value, setValue] = useState('')
  useEffect(() => {
    if (props.searchValue && !value) {
      setValue(props.searchValue)
    }
  }, [props.searchValue])

  const handleSearch = (e) => {
    setValue(e.currentTarget.value)
    props.onChange(e.currentTarget.value)
  }
  return (
    <form className={styles.root} action="/search">
      <input
        name="query"
        type="text"
        value={value}
        autoComplete={'off'}
        onChange={handleSearch}
        placeholder={props.placeholder}
      />
        <Button className={styles.btn}>
          <img src="/img/icons/search.svg" alt="" />
        </Button>
    </form>
  )
}
