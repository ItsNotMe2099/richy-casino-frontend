import styles from './index.module.scss'
import {ReactElement} from 'react'
import {BlackjackBetType} from 'components/for_pages/games/BlackJack/data/enums'
import classNames from 'classnames'

interface Props {
  type: BlackjackBetType
  onClick: (type: BlackjackBetType) => void
  disabled?: boolean
  active?: boolean
  children?: ReactElement | string
}

export default function BlackjackBetButton(props: Props) {

  return (
    <div className={classNames(styles.root, {[styles.disabled]: props.disabled, [styles.active]: props.active})} onClick={() => !props.disabled ? props.onClick(props.type) : null}>
      {props.children}
    </div>

  )
}


