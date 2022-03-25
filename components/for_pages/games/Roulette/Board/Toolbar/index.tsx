import styles from './index.module.scss'
import { RouletteBets} from 'components/for_pages/games/Roulette/data/enums'
import GameCloseCircleSvg from 'components/for_pages/games/components/svg/GameCloseCircleSvg'
import cx from 'classnames'
import GameBackCircleSvg from 'components/for_pages/games/components/svg/GameBackCircleSvg'
interface Props{
  bets: RouletteBets,
  onClear: () => void,
  onUndo: () => void
}
export default function Toolbar(props: Props) {
  const {bets} = props


  return (
      <div className={cx(styles.root, {[styles.hidden]: Object.keys(props.bets).length === 0})}>
        <div className={cx({[styles.button]: true, [styles.undo]: true})} onClick={props.onUndo}><GameBackCircleSvg/>Отмена</div>
        <div className={cx({[styles.button]: true, [styles.clear]: true})} onClick={props.onClear}><GameCloseCircleSvg/>Очистить</div>

      </div>
  )
}


