import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import { useMemo } from 'react'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'
import classNames from 'classnames'

interface Props extends FieldConfig {
  label?: string
  from: number // number is included in the range
  to: number // number is included in the range
  afterChange?: (value: number) => void
}

export default function GFieldSelectNumber(props: Props) {
  if (props.to <= props.from) {
    throw new Error('"to" must be more then "from"')
  }

  const [field, meta, helper] = useField(props)
  const range = useMemo(() => {
    const list: number[] = []
    for (let i = props.from; i < props.to + 1; i++) {
      list.push(i)
    }
    return list
  }, [props.to, props.from])
  const hasError = !!meta.error && meta.touched

  return (
    <div className={styles.root}>
      <GFieldLabel label={props.label} hasError={hasError}/>
      <div className={styles.row}>
        {range.map(item => (
          <button
            key={item}
            className={classNames({
              [styles.btn]: true,
              [styles.active]: item === field.value,
            })}
            onClick={(e) => {
              e.preventDefault()
              helper.setValue(item)
              if (props.afterChange) {
                props.afterChange(item)
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

