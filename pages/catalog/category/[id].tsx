import {GetServerSideProps} from 'next'
import GameListRepository from 'data/repositories/GameListRepository'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GamesListCategory from 'components/for_pages/CatalogPage/GamesListCategory'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  return (
    <WithGameFilterLayout showMobile>
         <GamesListCategory category={props.category}/>
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await GameListRepository.fetchCategories()

  const category = providers.data.find(i => i.id === parseInt(context.query.id as string, 10))
  if(!category){
    return {
      notFound: true
    }
  }

  return {
    props: {
      category,
      ...await getServerSideTranslation(context),
    },
  }
}
