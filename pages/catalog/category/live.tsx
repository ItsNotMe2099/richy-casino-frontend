import {GetServerSideProps} from 'next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {getServerSideTranslation} from 'utils/i18'
import GamesListLive from 'components/for_pages/CatalogPage/GamesListLive'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  return (
    <WithGameFilterLayout showMobile>
         <GamesListLive/>
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
