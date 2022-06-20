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
    if(props.onChange) {
      props.onChange(e.currentTarget.value)
    }
  }
  return (
    <div className={styles.root}>
      <input
        name="query"
        type="text"
        value={value}
        autoComplete={'off'}
        onChange={handleSearch}
        placeholder={props.placeholder}
      />
      <div onClick={props.onClick} className={styles.btn}>
        <Button>
          <img src="/img/Filter/icons/search.svg" alt="" />
        </Button>
      </div>
    </div>
  )
}
