import styles from './index.module.scss'
import classNames from 'classnames'
import {ISwitchFilterItem} from 'types/interfaces'
export interface SwitchFilterBaseProps<T> {
  active?: T
  onClick?: (item: T) => void
  items?: ISwitchFilterItem<T>[]
}
interface Props<T> extends SwitchFilterBaseProps<T>{

}

export default function SwitchFilter<T>(props: Props<T>) {
  return (
      <div className={styles.root}>
        {props.items.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.value === props.active})} key={index} onClick={() => props.onClick(item.value)}>
              {item.icon}
              <div className={styles.label}>{item.label}</div>
            </div>
          )}
      </div>
  )
}
