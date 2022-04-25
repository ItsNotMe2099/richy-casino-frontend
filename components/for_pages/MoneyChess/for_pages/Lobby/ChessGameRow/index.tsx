import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/index.module.scss'
import {differenceInSeconds} from 'date-fns'
import { IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {formatSeconds} from 'components/for_pages/MoneyChess/utils/chess'
import ChessGameUser from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameUser'
import ChessGameTypeColumn from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameTypeColumn'
import ChessGameTimeColumn from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameTimeColumn'
import {ChessGameTime} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import ChessGameAmountColumn from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameAmountColumn'
import classNames from 'classnames'
import { Circle } from 'rc-progress'
import {useEffect, useRef, useState} from 'react'
import {colors} from 'scss/variables'
import {getPercentFromDuration} from 'components/for_pages/MoneyChess/utils/time'

export enum ChessGameRowAction{
  Wait = 'wait',
  InProgress = 'inProgress',
  Arrow = 'inProgress'
}
interface Props {
  isMobile: boolean
  isFinished: boolean,
  duration?: number
  startedAt?: string
  finishedAt?: string
  game: IChessGame
  times: ChessGameTime[]
  amount: number
  style?: 'games' | 'bets'
  isStats?: boolean
  onClick?: () => void
  action?: ChessGameRowAction
  timerExpiredAt?: string
  timerStartAt?: string
}

const WaitAction = ({timerStartedAt,timerExpiredAt}: {timerStartedAt: string, timerExpiredAt: string}) => {
  const [progress, setProgress] = useState(getPercentFromDuration(timerStartedAt, timerExpiredAt))
  const intervalRef = useRef(null)
  useEffect(() => {
    if(intervalRef.current){
      clearInterval( intervalRef.current)
    }
    if(getPercentFromDuration(timerStartedAt, timerExpiredAt) >= 0){
      intervalRef.current = setInterval(() => {
        const percent = getPercentFromDuration(timerStartedAt, timerExpiredAt)
        if(percent >= 100){
          if(intervalRef.current){
            clearInterval( intervalRef.current)
          }
        }
        setProgress(getPercentFromDuration(timerStartedAt, timerExpiredAt))
      }, 1000)
    }
    return () => {
      if( intervalRef.current){
        clearInterval( intervalRef.current)
      }
    }
  }, [timerExpiredAt])
  return <div className={classNames(styles.rowAction, styles.wait)}>
    <Circle percent={progress} className={styles.progress} strokeWidth={8} trailWidth={8} strokeColor={colors.lose500} trailColor={'rgba(231,71,0, 0.4)'}  />
    <img src={'/img/Chess/user.svg'}/>
  </div>
}
const InProgressAction = () => {
  return <div className={classNames(styles.rowAction, styles.inProgress)}>

  </div>
}
const ArrowAction = () => {
  return <div className={classNames(styles.rowAction, styles.arrow)}><img src={'/img/Chess/row_arrow.svg'}/></div>
}
export default function ChessGameRow(props: Props) {
  const renderAction = (action: ChessGameRowAction) => {
    switch (action){
      case ChessGameRowAction.Arrow:
        return <ArrowAction/>
      case ChessGameRowAction.InProgress:
        return <InProgressAction/>
      case ChessGameRowAction.Wait:
        return <WaitAction timerStartedAt={props.timerStartAt} timerExpiredAt={props.timerExpiredAt}/>
    }
  }
  if(!props.isMobile){
    return (<tr onClick={props.onClick}>
      {props.isFinished && <td>
        {formatSeconds(differenceInSeconds(new Date(props.finishedAt), new Date(props.startedAt)))}
      </td>}
      <td>
        <div className={styles.users}>
          <ChessGameUser user={props.game.ownerUser}/>
          {props.game.opponentUser && <span className={styles.vs}>VS</span>}
          {props.game.opponentUser && <ChessGameUser user={props.game.opponentUser}/>}
        </div>
      </td>
      <td>
        <ChessGameTypeColumn type={props.game.gameType}/>
      </td>
      <td>
        <ChessGameTimeColumn timeKey={props.game.timeKey} times={props.times}/>
      </td>
      <td className={classNames(styles.column, styles.bet)}>
        <ChessGameAmountColumn type={'win'} amount={props.amount} currency={props.game.currency}/>
      </td>
      {props.action && <td className={classNames(styles.column, styles.action)}>{renderAction(props.action)}</td>}
    </tr>)
  }
  return (<div className={styles.item} onClick={props.onClick}>
      <div className={styles.top}>
        <div className={styles.users}>
          <ChessGameUser user={props.game.ownerUser}/>
          {props.game.opponentUser && <span className={styles.vs}>VS</span>}
          {props.game.opponentUser && <ChessGameUser user={props.game.opponentUser}/>}
        </div>
        {props.action && renderAction(props.action)}
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          {props.isFinished &&

          <div className={styles.begin}>
            {formatSeconds(differenceInSeconds(new Date(props.finishedAt), new Date(props.startedAt)))}
          </div>
          }
          <div className={styles.time}>
            <ChessGameTimeColumn timeKey={props.game.timeKey} times={props.times}/>
          </div>
          <div className={styles.mult}>
            <ChessGameTypeColumn type={props.game.gameType}/>
          </div>
        </div>
        <div className={styles.money}>
          <ChessGameAmountColumn type={'win'} amount={props.amount} currency={props.game.currency}/>
        </div>
      </div>
    </div>
  )
}
