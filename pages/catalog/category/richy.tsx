import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import { useAppContext } from 'context/state'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import Head from 'next/head'
import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  return (  <WithGameFilterLayout showMobile>
    <Head>
      <meta name="twitter:title" content={t('seo_richy_twitter_title')}/>
      <meta name="twitter:description" content={t('seo_richy_twitter_description')}/>
      <meta name="keywords" content={t('seo_richy_keywords')}/>
    </Head>
    <NextSeo
      title={t('seo_richy_title')}
      description={t('seo_richy_description')}
      openGraph={{
        title: t('seo_richy_og_title'),
        description: t('seo_richy_og_description'),
        site_name: t('seo_richy_og_site_name'),
        type: 'website',
        locale: 'en_US',
        url: 'https://richy.casino/catalog/category/richy',
      }}
    />
       <GamesListRichy/>
  </WithGameFilterLayout>)
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
