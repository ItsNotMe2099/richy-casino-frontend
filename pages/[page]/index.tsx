import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {IPagination} from 'types/interfaces'
import InfoPage from 'components/for_pages/InfoPage'
import {NextSeo} from 'next-seo'
import {getServerSideTranslation} from 'utils/i18'
interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function PageItemPage(props: Props) {
 return (<>
   <NextSeo title={props.page.title}/>
   <InfoPage pages={props.pages} page={props.page}/>
   </>)
}


export const getServerSideProps: GetServerSideProps = async (context ) => {
 if(context.query.page === 'index'){
   return {
     notFound: true
   }
 }
  const page = await PagesRepository.fetchBySlug(context.query.page as string, context.locale ?? 'en')
  const pages = await PagesRepository.fetchList(1, 30)
  return {
    props: {
      ...await getServerSideTranslation(context),
      page,
      pages,
    },
    notFound: !page
  }
}
