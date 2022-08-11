import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import {IGame} from 'data/interfaces/IGame'
import GameFavoriteRepository from 'data/repositories/GameFavoriteRepository'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import {useTranslation} from 'next-i18next'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ContentLoader from 'components/ui/ContentLoader'
import GameCard from 'components/for_pages/Common/GameCard'

interface Props {

}

interface ItemProps {
  icon: string
}

export default function Favorite(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IGame[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    GameFavoriteRepository.fetchGames().then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])
  const handleDelete = (game: IGame) => {
    setData(data => data.filter(i => i.id !== game.id))
  }

  return (
    <ProfileModalLayout fixed>
      <ProfileModalHeader title={t('favorite_title')}/>
      <ProfileModalBody fixed>
        {loading && <ContentLoader style={'block'} isOpen={true}/>}
        {!loading && <div className={styles.root}>
          {data.map((item, index) =>
            <GameCard item={item} key={item.id} onDeleteFromFavorite={handleDelete}/>
          )}
        </div>}
      </ProfileModalBody>
    </ProfileModalLayout>
  )
}
