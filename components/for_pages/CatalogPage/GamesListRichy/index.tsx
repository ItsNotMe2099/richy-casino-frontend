import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {richyGames} from 'components/for_pages/Common/GameTypes/game-types'


interface Props {

}

export default function GamesListRichy(props: Props) {
  return (
    <GamesList title={'Richy Games'} icon={'/img/Contents/gamepad.svg'} totalItems={richyGames.length} items={richyGames.map(i => ({imageIconPreviewUrl: i.image, name: i.label, link: i.link}))} loading={false}/>
  )
}
