import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameFavoriteRepository from 'data/repositories/GameFavoriteRepository'

interface Props {

}

export default function GamesListFavorite(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 30

  useEffect(() => {
    GameFavoriteRepository.fetchGames().then(i => {
      setData({data: i, total: i.length})
    })
  }, [])


  const handleScrollNext = async () => {

  }
  return (
    <GamesList title={'Избранные'}
               icon={'/img/Contents/all-games.svg'}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               onScrollNext={handleScrollNext}
    />
  )
}
