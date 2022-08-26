import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import {AppContext} from 'next/app'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <WithGameFilterLayout showMobile>
      <NextSeo title={t('page_games_top_title')}/>
         <GamesListTop/>
    </WithGameFilterLayout>
  )
}
export async function getServerSideProps(context: AppContext) {
  return {
    props: {
      ...await getServerSideTranslation(context)
    }
  }
}
