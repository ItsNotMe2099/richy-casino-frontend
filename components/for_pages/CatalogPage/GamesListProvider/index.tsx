import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import {useTranslation} from 'next-i18next'

interface Props {
  provider: IGameProvider
}

export default function GamesListProvider(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20

  useEffect(() => {
    GameListRepository.fetchGames({providerId: props.provider.id}, 1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [props.provider])

  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    const res = await GameListRepository.fetchGames({providerId: props.provider.id}, newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={props.provider.name}
               icon={props.provider.imagePreviewUrl}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               onScrollNext={handleScrollNext}
    />
  )
}
