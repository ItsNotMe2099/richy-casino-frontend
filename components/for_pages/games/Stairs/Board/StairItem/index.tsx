import styles from './index.module.scss'
import cx from 'classnames'
import {StairItemStatus} from 'components/for_pages/games/Stairs/data/enums'

interface Props{
  status: StairItemStatus,
  onClick: () => void
  rowIndex: number
  colIndex: number
}
export default function StairItem({status, onClick, rowIndex, colIndex}: Props) {
  return (
    <div className={cx(styles.root, {
      [styles.disabled]: status === StairItemStatus.Disabled,
      [styles.active]: status === StairItemStatus.Active,
      [styles.stair]: status === StairItemStatus.Stair,
      [styles.mine]: status === StairItemStatus.Mine,
      [styles.mineSelected]: status === StairItemStatus.MineSelected,
    })} onClick={onClick} data-stair={`${rowIndex}-${colIndex}`}>
      {[StairItemStatus.Mine, StairItemStatus.MineSelected].includes(status) && <div className={styles.mineIcon}><img src={'/img/Games/stairs/mine.svg'}/></div>}
      {[StairItemStatus.Stair, StairItemStatus.MineSelected].includes(status) && <div className={styles.stair}><img src={'/img/Games/stairs/stairs.svg'}/></div>}
    </div>
  )
}


