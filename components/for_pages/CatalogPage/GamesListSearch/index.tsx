import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'

enum GameSwitchFilterKey{
  All = 'all',
  Popular = 'Popular',
  New = 'new',
  Roulette = 'Roulette',
  Slots = 'slots',
  Blackjack = 'blackjack',
}

interface Props {
  data: IPagination<IGame>
  loading: boolean
  onScrollNext: () => void
}

export default function GamesListSearch({data, loading, onScrollNext}: Props) {

  return (
    <GamesList title={'Поиск'}
               icon={'/img/Contents/all-games.svg'}
               totalItems={data.total}
               items={data.data}
               loading={loading}
               onScrollNext={onScrollNext}
    />
  )
}
