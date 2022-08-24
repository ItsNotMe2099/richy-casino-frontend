import {GetServerSideProps} from 'next'
import GameListRepository from 'data/repositories/GameListRepository'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GamesListCategory from 'components/for_pages/CatalogPage/GamesListCategory'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import {getServerSideTranslation} from 'utils/i18'

interface Props {
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <WithGameFilterLayout showMobile>
      <NextSeo title={props.category?.name}/>
      <GamesListCategory category={props.category}/>
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await GameListRepository.fetchCategories()

  const category = providers.data.find(i => i.id === parseInt(context.query.id as string, 10))
  if (!category) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...await getServerSideTranslation(context),
      category,

    },
  }
}
