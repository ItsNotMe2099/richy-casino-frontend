import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {IPagination} from 'types/interfaces'
import InfoPage from 'components/for_pages/InfoPage'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'

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
      title={t('seo_info_title')}
      description={t('seo_info_description')}
      openGraph={{
        title: t('seo_info_og_title'),
        description: t('seo_info_og_description'),
        site_name: t('seo_info_og_site_name'),
        type: 'website',
        locale: 'en_US',
        url: 'https://richy.casino/lottery',
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
  const page = await PagesRepository.fetchBySlug(pages.data[0].internalName, context.locale ?? 'en')
  return {
    props: {

      pages,
      page
    }
  }
}
