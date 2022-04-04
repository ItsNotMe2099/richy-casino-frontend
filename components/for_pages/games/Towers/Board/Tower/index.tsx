import styles from './index.module.scss'
import {TowerStatus} from 'components/for_pages/games/Towers/data/enums'
import cx from 'classnames'

interface Props{
  status: TowerStatus,
  onClick: () => void
}
export default function Tower({status, onClick}: Props) {
  return (
    <div className={cx(styles.root, {
      [styles.disabled]: status === TowerStatus.Disabled,
      [styles.active]: status === TowerStatus.Active,
      [styles.mine]: status === TowerStatus.Mine,
      [styles.bonus]: status === TowerStatus.Bonus
    })} onClick={TowerStatus.Active ? onClick : null}/>
  )
}


