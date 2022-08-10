import Tournament from 'components/for_pages/MainPage/Tournament'
import Winners from 'components/for_pages/MainPage/Winners'
import styles from 'pages/tournaments/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import PageTitle from 'components/for_pages/Common/PageTitle'
import Head from 'next/head'

export default function Tournaments(){

  const {t} = useTranslation()

  return (
    <Layout>
      <Head>
        <meta name="twitter:title" content={t('seo_tournaments_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_tournaments_twitter_description')}/>
        <meta name="keywords" content={t('seo_tournaments_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_tournaments_title')}
        description={t('seo_tournaments_description')}
        openGraph={{
          title: t('seo_tournaments_og_title'),
          description: t('seo_tournaments_og_description'),
          site_name: t('seo_tournaments_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/tournaments',
        }}
      />
        <div className={styles.root}>
          <PageTitle title={t('page_tournament_title')}/>
          <Tournament />
          <Winners/>
        </div>
    </Layout>
  )
}
