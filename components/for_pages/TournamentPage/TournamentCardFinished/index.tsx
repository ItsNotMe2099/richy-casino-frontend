import styles from './index.module.scss'
import {useMeasure} from 'react-use'
import classNames from 'classnames'
import {pad} from 'utils/formatter'
import {useTranslation} from 'next-i18next'
import {format} from 'date-fns'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'

interface Props {
 tournament: ITournamentHistory
}
const TimerItem = (props: {value: number, label: string}) => {
  const parts =  pad('00', props.value)
  return (<div className={styles.timerItem}>
    <div className={styles.timerGroup}>
      <div className={styles.timerSquare}><div className={styles.number}>{parts[0]}</div></div>
      <div className={styles.timerSquare}><div className={styles.number}>{parts[1]}</div></div>
    </div>
    <div className={styles.timeLabel}>{props.label}</div>
  </div>)
}
export default function TournamentCardFinished(props: Props) {
  const [ref, { width }] = useMeasure()
  const {t} = useTranslation()


  return (
    <div className={classNames(styles.root)}>
      <div className={styles.label}>     {t('tournament_card_finished')}</div>
      <div className={styles.dates}>
        {format(new Date(props.tournament.timeStart), 'dd.MM.yy')} - {format(new Date(props.tournament.timeEnd), 'dd.MM.yy')}
      </div>
    </div>

  )
}
