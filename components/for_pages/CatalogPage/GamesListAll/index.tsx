import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination, ISwitchFilterItem} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import GameListRepository from 'data/repositories/GameListRepository'
import Dice from 'components/svg/Dice'
import Favorite from 'components/svg/Favorite'
import New from 'components/svg/New'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {IGameCategory} from 'data/interfaces/IGameCategory'

enum GameSwitchFilterKey{
  All = 'all',
  Popular = 'Popular',
  New = 'new',
}

interface Props {

}

export default function GamesListAll(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [categories, setCategories] = useState<IGameCategory[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20
  const [filter, setFilter] = useState<GameSwitchFilterKey | number>(GameSwitchFilterKey.All)

  const allLink = Routes.catalogAll
  const currentPage = useIsActiveLink(allLink)
  const filters: ISwitchFilterItem<GameSwitchFilterKey | number>[] = [
    {label: 'Все', value: GameSwitchFilterKey.All, icon: <Dice/>},
    {label: 'Популярные', value: GameSwitchFilterKey.Popular, icon: <Favorite/>},
    {label: 'Новинки', value: GameSwitchFilterKey.New, icon: <New/>},
    ...categories.map(i => ({label: i.name, value: i.id, icon: <img src={i.imageIconUrl}/>})),

  ]
  useEffect(() => {
    setLoading(true)
    switch (filter){
      case GameSwitchFilterKey.All:
        GameListRepository.fetchGames({}, 1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.New:
        GameListRepository.fetchLatestGames({}, 1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.Popular:
        GameListRepository.fetchPopularGames(1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
      default:
        GameListRepository.fetchGames({categoryId: filter as number} , 1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
    }
  }, [filter])
  useEffect(() => {
    GameListRepository.fetchCategories(null, null, 1, 100, true).then(i => setCategories(i.data.filter(i => i.isFeatured)))

  }, [])

  const handleChangeFilter = (item: GameSwitchFilterKey) => {
    setData({data: [], total: 0})
    setFilter(item)
  }
  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    let res: IPagination<IGame>  = {data: [], total: 0}


    switch (filter){
      case GameSwitchFilterKey.All:
        res = await GameListRepository.fetchGames({}, newPage, limit)
        break
      case GameSwitchFilterKey.New:
        res = await GameListRepository.fetchLatestGames({}, newPage, limit)
        break
      case GameSwitchFilterKey.Popular:
        res = await GameListRepository.fetchPopularGames(newPage, limit)
        break
      default:
        res = await GameListRepository.fetchGames({categoryId: filter as number} , newPage, limit)
        break
    }

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
      switchFilter={<SwitchFilter<GameSwitchFilterKey | number> items={filters} onClick={handleChangeFilter} active={filter}/> }
    />
  )
}
