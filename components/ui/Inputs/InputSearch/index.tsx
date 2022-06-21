import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useThrottleFn } from '@react-cmpt/use-throttle'

interface Props {
  placeholder?: string
  searchValue?: string
  hasAutocomplete?: boolean
  searchRequest: (keywords: string) => void
}

export default function InputSearch(props: Props) {

  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.searchValue && !value) {
      setValue(props.searchValue)
    }
  }, [props.searchValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (value) {
      props.searchRequest(value)
    }
  }

  const handleSearch = async (value: string) => {
    if (value.length < 3 && value !== '') {
      return
    } else  {
      setValue(value)
    }
    const res = await props.searchRequest(value)
    console.log('Res', res)
  }

  const { callback: search } = useThrottleFn(handleSearch, 300)

  return (
    <form className={styles.root} action="/search" onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          value={value}
          autoComplete={'off'}
          onChange={(e) => {
            const value = e.currentTarget.value
            setValue(value)
            search(value)
          }}
          placeholder={props.placeholder}
        />
         <Button className={styles.btn}>
            <img src="/img/icons/search.svg" alt="" />
        </Button>
    </form>
  )
}
