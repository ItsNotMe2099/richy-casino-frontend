import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {richyGames} from 'components/for_pages/Common/GameTypes/game-types'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'


interface Props {

}

export default function GamesListRichy(props: Props) {
  const allLink = Routes.catalogLive
  const currentPage = useIsActiveLink(allLink)
  return (
    <GamesList title={'Richy Games'}    allLink={!currentPage? allLink : null} icon={'/img/Contents/gamepad.svg'} totalItems={richyGames.length} items={richyGames.map(i => ({imageIconPreviewUrl: i.image, name: i.label, link: i.link}))} loading={false}/>
  )
}
