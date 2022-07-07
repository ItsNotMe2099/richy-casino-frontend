import {GetServerSideProps} from 'next'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import { useAppContext } from 'context/state'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  return (  <WithGameFilterLayout>
    <NextSeo title={t('page_games_richy_title')}/>
       <GamesListRichy/>
  </WithGameFilterLayout>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {

    },
  }
}
