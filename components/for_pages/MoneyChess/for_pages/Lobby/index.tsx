import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/index.module.scss'
import Button from 'components/ui/Button'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'
import ChessGameRow, {ChessGameRowAction} from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow'
import {ChessGameTimesList} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {useEffect, useState} from 'react'
import ChessGameBoardRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameBoardRepository'
import {ChessGameBoardStatus, IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import Table from 'components/for_pages/MoneyChess/components/Table'
import EmptyLobby from 'components/for_pages/MoneyChess/for_pages/Lobby/EmptyLobby'
import {IChessTableActionEvent} from 'components/for_pages/MoneyChess/data/types'
import {ChessGameTableActionType} from 'components/for_pages/MoneyChess/data/enums'
import classNames from 'classnames'

interface Props {

}

export default function ChessGameLobby(props: Props) {
  const lobbyContext = useChessGameLobbyContext()
  const [myGames, setMyGames] = useState<IChessGameBoard[]>([])
  const [myGamesTotal, setMyGamesTotal] = useState<number>(0)
  const [allGames, setAllGames] = useState<IChessGameBoard[]>([])
  const [allGamesTotal, setAllGamesTotal] = useState<number>(0)
  const [myGamesLoading, setMyGamesLoading] = useState<boolean>(true)
  const [allGamesLoading, setAllGamesLoading] = useState<boolean>(true)
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    const subscription = lobbyContext.tableState$.subscribe((data: IChessTableActionEvent) => {
      const setByTableId = (game: IChessGameBoard, tableId: number, data: IChessGameBoard) => {
        return game.tableId === tableId ? {game, ...data} : game
      }
      switch (data.type) {
        case ChessGameTableActionType.NewGame:
          if (lobbyContext.user.id === data.table.ownerUserId) {
            setMyGames(games => [data.board, ...games])
            setMyGamesTotal(total => total + 1)
          } else {
            setAllGames(games => [data.board, ...games])
            setAllGamesTotal(total => total + 1)
          }
          break
        case ChessGameTableActionType.Sit:
        case ChessGameTableActionType.Exit:
        case ChessGameTableActionType.Start:
          if (lobbyContext.user.id === data.table.ownerUserId) {
            setMyGames(games => games.map(i => setByTableId(i, data.tableId, data.board)))
          } else {
            setAllGames(games => games.map(i => setByTableId(i, data.tableId, data.board)))
          }
          break
        case ChessGameTableActionType.Finish:
          if (lobbyContext.user.id === data.table.ownerUserId) {
            setMyGames(games => games.filter(i => i.tableId !== data.tableId))
          } else {
            setAllGames(games => games.filter(i => i.tableId !== data.tableId))
          }
          break

      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [lobbyContext.user, allGames, myGames])
  useEffect(() => {
    ChessGameBoardRepository.listMyActive({}, 1, 30).then(data => {
      setMyGames(data.data)
      setMyGamesTotal(data.total)
      setMyGamesLoading(false)
      setInit(true)
    })
    ChessGameBoardRepository.listAllActive({}, 1, 30).then(data => {
      setAllGames(data.data)
      setAllGamesTotal(data.total)
      setMyGamesLoading(false)
      setInit(true)
    })
  }, [])
  const handleClickActive = (item: IChessGameBoard) => {
    lobbyContext.showModal(ChessGameLobbyModalType.Opponents, {board: item})
  }
  const renderToolbar = () => {
    return <>
      <div className={styles.header}>
        <div className={styles.statistics}>
          <Button className={styles.statButton} background='dark500' href={'/chess/stats'}>Статистика</Button>
        </div>
        <div className={styles.btnsGroup}>
          <Button className={styles.filter} background='dark500'>Фильтр</Button>
          <Button className={styles.create} background='blueGradient500'
                  onClick={() => lobbyContext.showModal(ChessGameLobbyModalType.createGame)}>Создать игру</Button>
        </div>
      </div>
    </>
  }
  const getRowMyAction = (item: IChessGameBoard): ChessGameRowAction | null => {
    switch (item.status) {

      case ChessGameBoardStatus.Waiting:
        return ChessGameRowAction.Arrow
      case ChessGameBoardStatus.InProgress:
        return ChessGameRowAction.InProgress
      case ChessGameBoardStatus.WaitingAccept:
        return ChessGameRowAction.Wait

    }
    return null
  }
  const showEmpty = init && (myGamesTotal === 0 && allGamesTotal === 0)
  return (
    <div className={classNames(styles.root, {[styles.empty]: showEmpty})}>


      {showEmpty && <EmptyLobby/>}
      {init && (myGamesTotal > 0 || allGamesTotal > 0) && <div className={styles.content}>
        <HiddenXs>
          {renderToolbar()}
        </HiddenXs>
        <Table<IChessGameBoard> hasActionColumn itemsSeparated={[myGames, allGames]} style='games' row={(isMobile, item) =>
          <ChessGameRow key={item.id} isMobile={isMobile}
                        isFinished={false}
                        game={item.table}
                        action={getRowMyAction(item)}
                        timerStartAt={item.actionWaitStartedAt}
                        timerExpiredAt={item.actionWaitExpiredAt}
                        times={ChessGameTimesList}
                        amount={item.table.betAmount}
                        onClick={() => handleClickActive(item)}/>}
        />
        <VisibleXs>
          {renderToolbar()}
        </VisibleXs>
      </div>}

    </div>
  )
}
