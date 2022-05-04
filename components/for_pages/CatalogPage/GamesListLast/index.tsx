import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'

interface Props {

}

export default function GamesListLast(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20

  useEffect(() => {
    GameListRepository.fetchGames({}, 1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])


  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    const res = await GameListRepository.fetchGames({}, newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={'Последние игры'}
               icon={'/img/Contents/all-games.svg'}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               onScrollNext={handleScrollNext}
    />
  )
}
