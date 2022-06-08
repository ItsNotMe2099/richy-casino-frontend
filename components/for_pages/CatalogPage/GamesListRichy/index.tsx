import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'
import {useTranslation} from 'next-i18next'


interface Props {

}

export default function GamesListRichy(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20
  const allLink = Routes.richyGames
  const currentPage = useIsActiveLink(allLink)
  useEffect(() => {
    GameListRepository.fetchRichy( 1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])

  return (
    <GamesList title={t('catalog_list_richy')} showAll allLink={!currentPage? allLink : null}
               icon={'/img/Contents/gamepad.svg'}
               totalItems={data?.total}
               items={data?.data ?? []}
               loading={loading}
               />
  )
}
