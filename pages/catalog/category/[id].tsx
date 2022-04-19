import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import GameListRepository from 'data/repositories/GameListRepository'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GamesListCategory from 'components/for_pages/CatalogPage/GamesListCategory'
import {IGameCategory} from 'data/interfaces/IGameCategory'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  return (
    <WithGameFilterLayout>
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
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
