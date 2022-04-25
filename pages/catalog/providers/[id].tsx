import {GetServerSideProps} from 'next'
import GamesListProvider from 'components/for_pages/CatalogPage/GamesListProvider'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import GameListRepository from 'data/repositories/GameListRepository'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  provider: IGameProvider
}
export default function CatalogPage(props: Props) {

  return (
    <WithGameFilterLayout showMobile>
         <GamesListProvider provider={props.provider}/>
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await GameListRepository.fetchProviders()
  const provider = providers.data.find(i => i.id === parseInt(context.query.id as string, 10))
  if(!provider){
    return {
      notFound: true
    }
  }

  return {
    props: {
      provider,
      ...await getServerSideTranslation(context),
    },
  }
}
