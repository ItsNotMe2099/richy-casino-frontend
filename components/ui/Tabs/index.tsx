import styles from './index.module.scss'
import classNames from 'classnames'
import {IOption} from 'types/interfaces'
import cx from 'classnames'
interface Props {
 value?: any
 options: IOption<any>[]
 onChange: (option) => void
  fluid?: boolean
}

export enum IGameModeType {
  Manual = 'manual',
  Auto = 'auto'
}

export default function Tabs(props: Props) {
  const {value, options, onChange, fluid} = props

  return (
    <div className={styles.container}>
    <div className={cx(styles.root, {[styles.fluid]: fluid})}>

      {options.map((item, index) => <div className={classNames(styles.item, {
        [styles.active]: item.value === value
      })} key={item.value} onClick={() => onChange(item)}>
        <div className={styles.label}>{item.label}</div>
      </div>)}
    </div>
    </div>
  )
}


