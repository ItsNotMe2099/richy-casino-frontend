import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/OpponentsModal/index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import {useTimer} from 'react-timer-hook'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import {ChessOpponentModalArguments, IChessTableActionEvent} from 'components/for_pages/MoneyChess/data/types'
import ChessGameUser from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameUser'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import {ChessGameBoardStatus, IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {useEffect, useState} from 'react'
import FormError from 'components/ui/Form/FormError'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import {pad} from 'utils/formatter'
import {
  getChessGameTimeIcon,
  getChessGameTimeName,
  getChessGameTypeIcon,
  getChessGameTypeName
} from 'components/for_pages/MoneyChess/types/factories'
import {ChessGameTimesList} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {useRouter} from 'next/router'
import {ChessGameTableActionType} from 'components/for_pages/MoneyChess/data/enums'

interface Props {

}

interface IUser {
  avatar: string
  name: string
  ready?: boolean
}

interface OpponentProps {
  user?: IGameUser
  ready?: boolean
}

interface StatusProps {
  ready?: boolean
}

interface OptionProps {
  image: string
  label: string
  value: string
  money?: boolean
  currency?: string
}

interface TimerProps {
  expiredAt: Date
  hidden?: boolean
}
const Timer = (props: TimerProps) => {
  const {
    seconds,
    minutes,
    restart
  } = useTimer({expiryTimestamp: props.expiredAt})
  useEffect(() => {
    restart(props.expiredAt, true)
  }, [props.expiredAt])
  return (
    <div className={classNames(styles.timer, {[styles.hidden]: props.hidden})}>
      <div className={styles.time}>{pad('00', minutes)}:{pad('00', seconds)}</div>
    </div>
  )
}

const Status = (props: StatusProps) => {
  return (
    <div className={classNames(styles.status, {[styles.ready]: props.ready})}>
      <div className={classNames(styles.text, {[styles.textReady]: props.ready})}>
        {props.ready ? <>Готов</> : <>Ожидание</>}
      </div>
    </div>
  )
}

const Opponent = (props: OpponentProps) => {
  return (
    <div className={styles.opponent}>
      {props.user && <ChessGameUser user={props.user}/>}
      <Status ready={props.ready}/>
    </div>
  )
}

const Option = (props: OptionProps) => {
  return (
    <div className={styles.option}>
      <div className={styles.icon}>
        <img src={props.image} alt=''/>
      </div>
      <div className={styles.label}>
        {props.label}
      </div>
      <div className={classNames(styles.value, {[styles.green]: props.money})}>
        <div className={styles.money}>{props.value}{props.money && <div className={styles.usdt}>{props.currency}</div>}</div>
      </div>
    </div>
  )
}
export default function OpponentsModal(props: Props) {
  const router = useRouter()
  const lobbyContext = useChessGameLobbyContext()
  const args = lobbyContext.modalArguments as ChessOpponentModalArguments
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [board, setBoard] = useState<IChessGameBoard>(args.board)

  useEffect(() => {
      const subscription = lobbyContext.tableState$.subscribe((data: IChessTableActionEvent) => {

      if(data.tableId === args.board.tableId){
        setBoard({...board, ...(data.table?.currentBoard)})
        if(data.type === ChessGameTableActionType.Start && data.table.opponentUserId === lobbyContext.user.id){
           router.push(`/chess/game/${board.tableId}`)
        }
      }
      })
      return () => {
        subscription.unsubscribe()
      }
  }, [args])
  const users = [
    {avatar: '/img/CreateGame/ava1.png', name: 'Alex Terner', ready: true},
    {avatar: '/img/CreateGame/ava2.png', name: 'Frida Zevik3', ready: false}
  ]

  const options = [
    {image: getChessGameTimeIcon({timeKey: board.table.timeKey, times: ChessGameTimesList}), label: 'Время', value: getChessGameTimeName(board.table.timeKey)},
    {image: getChessGameTypeIcon(board.table.gameType), label: 'Тип игры', value: getChessGameTypeName(board.table.gameType)},
    {image: '/img/CreateGame/money.svg', label: 'Ставка', value: board.table.betAmount.toFixed(8), currency: board.table.currency?.toUpperCase() ?? 'BTC'},
  ]



  const handleSit = async () => {
    setSending(true)
    setError(false)
    try{
      await ChessGameRepository.sit(board.tableId)
    }catch (e){
      setError(e)
    }
    setSending(false)
  }
  const handleStartGame = async () => {
    setSending(true)
    setError(false)
    try{
      await ChessGameRepository.startGame(board.tableId)
      await router.push(`/chess/game/${board.tableId}`)
    }catch (e){
      setError(e)
    }
    setSending(false)
  }
  const opponentReady = board.players.length > 1
  const isWaiting = board.status  === ChessGameBoardStatus.Waiting || board.status === ChessGameBoardStatus.WaitingAccept
  const ownerReady = board.status === ChessGameBoardStatus.Waiting || board.status !== ChessGameBoardStatus.WaitingAccept
  const isOwner = lobbyContext.user?.id === board.players[0].user.id
  const isInProgress =  board.status === ChessGameBoardStatus.InProgress
  const isFinished = board.isFinished
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Opponent user={board.players[0].user} ready={ownerReady}/>
        <Opponent user={board.players[1]?.user} ready={opponentReady}/>

      </div>
      <div className={styles.options}>
        {options.map((item, index) =>
          <Option image={item.image} label={item.label} value={item.value} key={index}
                  money={index === 2 ? true : false} currency={item.currency}/>
        )}
      </div>
      <Timer hidden={!board?.actionWaitExpiredAt || board.status !== ChessGameBoardStatus.WaitingAccept} expiredAt={new Date(board?.actionWaitExpiredAt)}/>
      <FormError error={error}/>
      {isInProgress && <div className={styles.statusText}>Игра началась</div>}
      {isFinished && <div className={styles.statusText}>Игра завершена</div>}
      {isWaiting && <div className={styles.btns}>
        <Button onClick={lobbyContext.hideModal} background='dark500' className={styles.cancel}>Назад</Button>
        {!ownerReady && isOwner &&
        <Button type='submit' background='blueGradient500' className={styles.begin} onClick={handleStartGame}>Начать игру</Button>}
        {!opponentReady && !isOwner &&
        <Button type='submit' background='blueGradient500' className={styles.begin} onClick={handleSit}>Вступить в игру</Button>}
      </div>}
    </div>
  )
}
