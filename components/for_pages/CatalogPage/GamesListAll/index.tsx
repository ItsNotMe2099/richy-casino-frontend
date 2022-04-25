import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination, ISwitchFilterItem} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import GameListRepository from 'data/repositories/GameListRepository'
import Dice from 'components/svg/Dice'
import Favorite from 'components/svg/Favorite'
import New from 'components/svg/New'
import Roulettes from 'components/svg/Roulettes'
import Slots from 'components/svg/Slots'
import Blackjack from 'components/svg/Blackjack'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'

enum GameSwitchFilterKey{
  All = 'all',
  Popular = 'Popular',
  New = 'new',
  Roulette = 'Roulette',
  Slots = 'slots',
  Blackjack = 'blackjack',
}

interface Props {

}

export default function GamesListLive(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 30
  const [filter, setFilter] = useState<GameSwitchFilterKey>(GameSwitchFilterKey.All)

  const allLink = Routes.catalogAll
  const currentPage = useIsActiveLink(allLink)
  const filters: ISwitchFilterItem<GameSwitchFilterKey>[] = [
    {label: 'Все', value: GameSwitchFilterKey.All, icon: <Dice/>},
    {label: 'Популярные', value: GameSwitchFilterKey.Popular, icon: <Favorite/>},
    {label: 'Новинки', value: GameSwitchFilterKey.New, icon: <New/>},
    {label: 'Рулетки', value: GameSwitchFilterKey.Roulette, icon: <Roulettes/>},
    {label: 'Слоты', value: GameSwitchFilterKey.Slots, icon: <Slots/>},
    {label: 'Блекджек', value: GameSwitchFilterKey.Blackjack, icon: <Blackjack/>},
  ]
  useEffect(() => {
    GameListRepository.fetchGames({}, 1, limit).then(i => {
      console.log('LoadGames', i)
      setData(i)
      setLoading(false)
    })
  }, [])

  const handleChangeFilter = (item: GameSwitchFilterKey) => {
    setFilter(item)
  }
  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    const res = await GameListRepository.fetchGames({}, newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={'Игры'}
               icon={'/img/Contents/all-games.svg'}
               allLink={!currentPage? allLink : null}
               totalItems={data?.total}
               items={data?.data ?? []}
               loading={loading}
               onScrollNext={handleScrollNext}
      switchFilter={<SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter} active={filter}/> }
    />
  )
}
