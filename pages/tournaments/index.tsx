import styles from 'pages/tournaments/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import ContentLoader from 'components/ui/ContentLoader'
import TournamentListBlock from 'components/for_pages/TournamentListPage/TournamentListBlock'
import {IPagination} from 'types/interfaces'

export default function Tournaments() {

  const {t} = useTranslation()
  const [listActive, setListActive] = useState<IPagination<ITournamentHistory>>({total: 0, data: []})
  const [listFinished, setListFinished] = useState<IPagination<ITournamentHistory>>({total: 0, data: []})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      TournamentRepository.fetchHistory(1, 1, 12).then(i => {
        setListActive(i)
      }),
      TournamentRepository.fetchHistory(4, 1, 12).then(i => {
        setListFinished(i)
      })]).then(() => setLoading(false))

  }, [])
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
      {loading ? <ContentLoader style={'block'} isOpen/> : <div className={styles.root}>
        <TournamentListBlock initialData={listActive} title={t('page_tournament_active_title')} type={'active'}/>
        <TournamentListBlock initialData={listFinished} title={t('page_tournament_completed_title')}
                             type={'completed'}/>
      </div>}
    </Layout>
  )
}


