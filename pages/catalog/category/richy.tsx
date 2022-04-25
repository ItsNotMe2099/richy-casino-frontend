import {GetServerSideProps} from 'next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  return (
    <WithGameFilterLayout showMobile>
         <GamesListRichy/>
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
