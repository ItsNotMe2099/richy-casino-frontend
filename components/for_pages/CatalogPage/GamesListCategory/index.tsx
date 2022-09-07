import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'
import {IGameCategory} from 'data/interfaces/IGameCategory'

interface Props {
  category: IGameCategory
}

export default function GamesListCategory(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20

  useEffect(() => {
    GameListRepository.fetchGames({categoryId: props.category.id, isShowAll: true}, 1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [props.category])

  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    const res = await GameListRepository.fetchGames({categoryId: props.category.id, isShowAll: true}, newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={props.category.name}
               icon={props.category.imageIconUrl}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               onScrollNext={handleScrollNext}
    />
  )
}
