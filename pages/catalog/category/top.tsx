import {GetServerSideProps} from 'next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  return (
    <WithGameFilterLayout showMobile>
         <GamesListTop/>
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
