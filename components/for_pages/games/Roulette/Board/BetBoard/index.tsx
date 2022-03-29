import {useGameContext} from 'components/for_pages/games/context/state'
import styles from './index.module.scss'
import cx from 'classnames'
import {IRouletteChip, RouletteBets, RouletteChipList} from 'components/for_pages/games/Roulette/data/enums'
import {ReactElement} from 'react'
import {RouletteBet} from 'components/for_pages/games/Roulette/components/RouletteBet'
interface Props{
  chip: IRouletteChip
  bets: RouletteBets,
  onBet:(key: string, chip: IRouletteChip) => void
}
export default function BetBoard(props: Props) {
  const {bets, chip} = props
  const gameContext = useGameContext()
  const numeric = [
    {value: 3, color: 'red'},
    {value: 6, color: 'black'},
    {value: 9, color: 'red'},
    {value: 12, color: 'red'},
    {value: 15, color: 'black'},
    {value: 18, color: 'red'},
    {value: 21, color: 'red'},
    {value: 24, color: 'black'},
    {value: 27, color: 'red'},
    {value: 30, color: 'red'},
    {value: 33, color: 'black'},
    {value: 36, color: 'red'},
    {value: 2, color: 'black'},
    {value: 5, color: 'red'},
    {value: 8, color: 'black'},
    {value: 11, color: 'black'},
    {value: 14, color: 'red'},
    {value: 17, color: 'black'},
    {value: 20, color: 'black'},
    {value: 23, color: 'red'},
    {value: 26, color: 'black'},
    {value: 29, color: 'black'},
    {value: 32, color: 'red'},
    {value: 35, color: 'black'},
    {value: 1, color: 'red'},
    {value: 4, color: 'black'},
    {value: 7, color: 'red'},
    {value: 10, color: 'black'},
    {value: 13, color: 'black'},
    {value: 16, color: 'red'},
    {value: 19, color: 'red'},
    {value: 22, color: 'black'},
    {value: 25, color: 'red'},
    {value: 28, color: 'black'},
    {value: 31, color: 'black'},
    {value: 34, color: 'red'},
  ]
  const renderChip = (className: string | string[], value: string, label?: string | ReactElement) => {
    const isSelected = !!bets[value]
    const selectChip = isSelected ? RouletteChipList.find(i => i.value === bets[value]) : null
    return ( <div className={cx(className, {[styles.chip]: true, [styles.active]: isSelected})} onClick={() => props.onBet(value, props.chip)}><span className={styles.text}>{label ?? value}</span> {isSelected && <RouletteBet className={styles.bet} type={selectChip.type} label={selectChip.label}/>}</div>)
  }

  return (
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={cx(styles.side, styles.left)}>
            {renderChip(styles.green, '0')}
          </div>

          <div className={styles.numeric}>
            {numeric.map(i => renderChip(styles[i.color], `${i.value}`))}
          </div>
          <div className={cx(styles.side, styles.right)}>
            {renderChip(styles.grey, 'row1', '2:1')}
            {renderChip(styles.grey, 'row2', '2:1')}
            {renderChip(styles.grey, 'row3', '2:1')}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.column}>
            {renderChip([styles.colspan, styles.grey], '1-12')}
            <div className={styles.row}>
              {renderChip(styles.grey, '1-18')}
              {renderChip(styles.grey, 'even', 'Even')}
            </div>
          </div>
          <div className={styles.column}>
            {renderChip([styles.colspan, styles.grey], '13-24')}
            <div className={styles.row}>
              {renderChip([styles.chipField, styles.grey],'red', <img src={'/img/Games/roulette/field_red.svg'}/>)}
              {renderChip([styles.chipField, styles.grey],'black', <img src={'/img/Games/roulette/field_black.svg'}/>)}
            </div>
          </div>
          <div className={styles.column}>
            {renderChip([styles.colspan, styles.grey], '25-36')}
            <div className={styles.row}>
              {renderChip(styles.grey, 'odd', 'Odd')}
              {renderChip(styles.grey, '19-36')}
            </div>
          </div>
        </div>

      </div>
  )
}


