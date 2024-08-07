import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {IPagination} from 'types/interfaces'
import InfoPage from 'components/for_pages/InfoPage'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {getServerSideTranslation} from 'utils/i18'

interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function PageItemPage(props: Props) {
  const {t} = useTranslation()
  return (<>
    <Head>
      <meta name="twitter:title" content={t('seo_info_twitter_title')}/>
      <meta name="twitter:description" content={t('seo_info_twitter_description')}/>
      <meta name="keywords" content={t('seo_info_keywords')}/>
    </Head>
    <NextSeo
      title={t('page_information_title')}
      openGraph={{
        type: 'website',
        url: 'https://richy.casino/info',
      }}
    />
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
  if(pages.data.length === 0){
    return {
      notFound: true
    }
  }
  const page = await PagesRepository.fetchBySlug(pages.data[0].internalName, context.locale ?? 'en')
  return {
    props: {
      ...await getServerSideTranslation(context),
      pages,
      page
    }
  }
}
