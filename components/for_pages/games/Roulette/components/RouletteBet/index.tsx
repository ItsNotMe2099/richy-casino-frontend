import styles from './index.module.scss'
import cx from 'classnames'
import {RouletteBetType} from 'components/for_pages/games/Roulette/data/enums'

interface Props {
  className?: string
  type: RouletteBetType,
  label: string
  isActive?: boolean
  onClick?: () => void
}

export const RouletteBet = (props: Props) => {
  const {type, label, isActive, className, onClick} = props
  return (
    <div className={cx(styles.root, className, {
      [styles.active]: isActive,
    })} onClick={onClick}>
      <div className={cx(styles.chip, {
        [styles.blue]: type === RouletteBetType.Blue,
        [styles.green]: type === RouletteBetType.Green,
        [styles.orange]: type === RouletteBetType.Orange,
        [styles.yellow]: type === RouletteBetType.Yellow,
        [styles.purple]: type === RouletteBetType.Purple,
        [styles.red]: type === RouletteBetType.Red,
      })}>
      {label}
      </div>
      <div className={styles.border1}/>
      <div className={styles.border2}/>
    </div>
  )
}
RouletteBet.defaultProps = {
}
