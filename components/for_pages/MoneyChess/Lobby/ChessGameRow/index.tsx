import styles from './index.module.scss'
import {differenceInSeconds} from 'date-fns'
import { IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {formatSeconds} from 'components/for_pages/MoneyChess/utils/chess'
import ChessGameUser from 'components/for_pages/MoneyChess/Lobby/ChessGameRow/ChessGameUser'
import ChessGameTypeColumn from 'components/for_pages/MoneyChess/Lobby/ChessGameRow/ChessGameTypeColumn'
import ChessGameTimeColumn from 'components/for_pages/MoneyChess/Lobby/ChessGameRow/ChessGameTimeColumn'
import {ChessGameTime} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import ChessGameAmountColumn from 'components/for_pages/MoneyChess/Lobby/ChessGameRow/ChessGameAmountColumn'

interface IGameType {
  icon: string
  mult: string
}

interface IPrize {
  amount: string
  iso: string
}

interface IUser {
  name: string
  avatar: string
}

interface IItem {
  begin: string
  users: IUser[]
  gameType: IGameType
  time: string
  prize: IPrize
  date: string
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
}

export default function ChessGameRow(props: Props) {
  if(!props.isMobile){
    return (<tr>
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
      <td>
        <ChessGameAmountColumn type={'win'} amount={props.amount} currency={props.game.currency}/>
      </td>
    </tr>)
  }
  return (<div className={styles.item}>
      <div className={styles.top}>
        <div className={styles.users}>
          <ChessGameUser user={props.game.ownerUser}/>
          {props.game.opponentUser && <span className={styles.vs}>VS</span>}
          {props.game.opponentUser && <ChessGameUser user={props.game.opponentUser}/>}
        </div>
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
