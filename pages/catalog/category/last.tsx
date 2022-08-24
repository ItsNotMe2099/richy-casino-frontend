import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListLast from 'components/for_pages/CatalogPage/GamesListLast'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <WithGameFilterLayout showMobile>
      <NextSeo title={t('page_games_last_title')}/>
         <GamesListLast/>
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
