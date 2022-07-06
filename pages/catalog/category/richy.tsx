import {GetServerSideProps} from 'next'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Layout from 'components/layout/Layout'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <Layout>
      <NextSeo title={t('page_games_richy_title')}/>
         <GamesListRichy/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {

    },
  }
}
