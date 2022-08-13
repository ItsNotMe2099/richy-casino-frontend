import styles from 'pages/tournaments/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import ContentLoader from 'components/ui/ContentLoader'
import {useRouter} from 'next/router'
import TournamentProviders from 'components/for_pages/TournamentPage/TournamentProviders'
import TournamentGames from 'components/for_pages/TournamentPage/TournamentGames'
import TournamentConditions from 'components/for_pages/TournamentPage/TournamentConditions'
export default function Tournaments(){

  const {t} = useTranslation()
  const router = useRouter()
  const [tournament, setTournament] = useState<ITournamentHistory | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    TournamentRepository.fetchHistory(1, 100).then(i => {
      console.log('Loadsadasd', i)
      setTournament(i.data.find(i => i.id === parseInt(router.query.id as string, 10)))
      setLoading(false)
    })
  }, [router.query.id])

  return null
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
      {loading ? <ContentLoader style={'block'} isOpen/> :    <div className={styles.root}>
        <div className={styles.columnsTop}>
          <TournamentProviders tournament={tournament}/>
          <TournamentGames tournament={tournament}/>
          <TournamentConditions tournament={tournament}/>
        </div>
      </div>}
    </Layout>
  )
}
