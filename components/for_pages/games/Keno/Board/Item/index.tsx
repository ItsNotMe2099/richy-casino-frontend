import styles from './index.module.scss'

import cx from 'classnames'
import {KenoItemStatus} from 'components/for_pages/games/Keno/data/enums'

interface Props{
  id: number
  status: KenoItemStatus,
  onClick: () => void
}
export default function Mine({id, status, onClick}: Props) {
  return (
    <div className={cx(styles.root, {
      [styles.unActive]: status === KenoItemStatus.UnActive,
      [styles.disabled]: status === KenoItemStatus.Disabled,
      [styles.active]: status === KenoItemStatus.Active,
      [styles.win]: status === KenoItemStatus.Win,
      [styles.lose]: status === KenoItemStatus.Lose
    })} onClick={onClick}><div className={styles.id}>{id}</div></div>
  )
}


