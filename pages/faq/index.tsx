import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {getServerSideTranslation} from 'utils/i18'
import {IPagination} from 'types/interfaces'
import FaqPage from 'components/for_pages/FaqPage'
interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function PageItemPage(props: Props) {
  return (<FaqPage pages={props.pages} page={props.page}/>)
}


export const getServerSideProps: GetServerSideProps = async (context ) => {
  if(context.query.page === 'index'){
    return {
      notFound: true
    }
  }
  const pages = await PagesRepository.fetchList(1, 30)
  const page = await PagesRepository.fetchBySlug(pages.data[0].internalName, context.locale ?? 'en')
  return {
    props: {
      ...await getServerSideTranslation(context),
      pages,
      page
    }
  }
}
