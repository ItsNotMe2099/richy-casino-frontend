import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import GamesListAllCache from 'components/for_pages/CatalogPage/GamesListAllCache'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <WithGameFilterLayout showMobile>
      <NextSeo title={t('page_games_all_title')}/>
         <GamesListAllCache/>
    </WithGameFilterLayout>
  )
}

