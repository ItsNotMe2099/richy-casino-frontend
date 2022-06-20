import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import {useTranslation} from 'next-i18next'

interface Props {
  data: IPagination<IGame>
  loading: boolean
  onScrollNext: () => void
  onSelect: () => void
}

export default function GamesListSearch({data, loading, onScrollNext, onSelect}: Props) {
  const {t} = useTranslation()
  return (
    <GamesList title={t('catalog_list_search')}
               icon={'/img/Contents/all-games.svg'}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               onSelect={onSelect}
               onScrollNext={onScrollNext}
    />
  )
}
