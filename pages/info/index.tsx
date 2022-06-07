import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {IPagination} from 'types/interfaces'
import InfoPage from 'components/for_pages/InfoPage'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'

interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function PageItemPage(props: Props) {
  const {t} = useTranslation()
  return (<>
    <NextSeo title={t('page_information_title')}/>
    <InfoPage pages={props.pages} page={props.page}/>
  </>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.page === 'index') {
    return {
      notFound: true
    }
  }
  const pages = await PagesRepository.fetchList(1, 30)
  const page = await PagesRepository.fetchBySlug(pages.data[0].internalName, context.locale ?? 'en')
  return {
    props: {

      pages,
      page
    }
  }
}
