import styles from './index.module.scss'

import cx from 'classnames'
import {LimboItemStatus} from 'components/for_pages/games/Limbo/data/enums'

interface Props{
  id: number
  status: LimboItemStatus,
  onClick: () => void
}
export default function Mine({id, status, onClick}: Props) {
  return (
    <div className={cx(styles.root, {
      [styles.unActive]: status === LimboItemStatus.UnActive,
      [styles.disabled]: status === LimboItemStatus.Disabled,
      [styles.active]: status === LimboItemStatus.Active,
      [styles.win]: status === LimboItemStatus.Win,
      [styles.lose]: status === LimboItemStatus.Lose
    })} onClick={onClick}><div className={styles.id}>{id}</div></div>
  )
}


