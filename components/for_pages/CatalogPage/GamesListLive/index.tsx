import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination, ISwitchFilterItem} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import GameListRepository from 'data/repositories/GameListRepository'
import Dice from 'components/svg/Dice'
import Favorite from 'components/svg/Favorite'
import New from 'components/svg/New'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {Routes} from 'types/routes'


enum GameSwitchFilterKey{
  All = 'all',
  Popular = 'Popular',
  New = 'new',
}

interface Props {

}

export default function GamesListAll(props: Props) {

  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 30
  const [filter, setFilter] = useState<GameSwitchFilterKey>(GameSwitchFilterKey.All)
  const allLink = Routes.catalogLive
  const currentPage = useIsActiveLink(allLink)
  const filters: ISwitchFilterItem<GameSwitchFilterKey>[] = [
    {label: 'Все', value: GameSwitchFilterKey.All, icon: <Dice/>},
    {label: 'Популярные', value: GameSwitchFilterKey.Popular, icon: <Favorite/>},
    {label: 'Новинки', value: GameSwitchFilterKey.New, icon: <New/>},
  ]
  useEffect(() => {
    GameListRepository.fetchLiveGames({}, 1, limit).then(i => {
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
    const res = await GameListRepository.fetchLiveGames({}, newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={'Live Casino'} icon={'/img/Contents/live.svg'}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               allLink={!currentPage? allLink : null}
               onScrollNext={handleScrollNext}
               switchFilter={<SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter} active={filter}/>}
    />
  )
}
