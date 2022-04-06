import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Table from '../Table'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import ChessGameRow from 'components/for_pages/MoneyChess/Lobby/ChessGameRow'
import {ChessGameTimesList} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {useEffect, useState} from 'react'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'

interface Props {

}

export default function ChessGameLobby(props: Props) {
  const lobbyContext = useChessGameLobbyContext()
  const [myGames, setMyGames] = useState<IChessGame[]>([])
  const [myGamesTotal, setMyGamesTotal] = useState<number>(0)
  const [allGames, setAllGames] = useState<IChessGame[]>([])
  const [allGamesTotal, setAllGamesTotal] = useState<number>(0)
  useEffect(() => {
    ChessGameRepository.listMyActive({}, 1, 30).then(data => {
      setMyGames(data.data)
      setMyGamesTotal(data.total)
    })
  }, [])
  return (
    <div className={styles.root}>
      <HiddenXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            <Button background='dark500' href={'/chess/stats'}>Статистика</Button>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            <Button className={styles.create} background='blueGradient500' onClick={() => lobbyContext.showModal(ChessGameLobbyModalType.createGame)}>Создать игру</Button>
          </div>
        </div>
      </HiddenXs>

      <Table<IChessGame> items={myGames} style='games' row={(isMobile, item) => <ChessGameRow key={item.id} isMobile={isMobile}
                                                                                            isFinished={false}
                                                                                            game={item}
                                                                                            times={ChessGameTimesList}
                                                                                            amount={item.betAmount}/>}/>
      <VisibleXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            <Button background='dark500' href={'/chess/stats'}>Статистика</Button>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            <Button className={styles.create} background='blueGradient500'>Создать игру</Button>
          </div>
        </div>
      </VisibleXs>
    </div>
  )
}
