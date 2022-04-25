import styles from './index.module.scss'
import {MineStatus} from 'components/for_pages/games/Mines/data/enums'
import cx from 'classnames'

interface Props{
  status: MineStatus,
  onClick: () => void
}
export default function Mine({status, onClick}: Props) {
  return (
    <div className={cx(styles.root, {
      [styles.disabled]: status === MineStatus.Disabled,
      [styles.loading]: status === MineStatus.Loading,
      [styles.mine]: status === MineStatus.Mine,
      [styles.bonus]: status === MineStatus.Bonus
    })} onClick={status ===MineStatus.Disabled ? onClick : null}/>
  )
}


