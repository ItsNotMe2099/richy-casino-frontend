import styles from './index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import { ITournamentHistoryItem} from 'data/interfaces/ITournamentHistory'
import ContentLoader from 'components/ui/ContentLoader'
import {useRouter} from 'next/router'
import TournamentProviders from 'components/for_pages/TournamentPage/TournamentProviders'
import TournamentGames from 'components/for_pages/TournamentPage/TournamentGames'
import TournamentConditions from 'components/for_pages/TournamentPage/TournamentConditions'
import {getServerSideTranslation} from 'utils/i18'
import {GetServerSideProps} from 'next'
import {ITournamentTop10} from 'data/interfaces/ITournamentTop10'
import {IPagination} from 'types/interfaces'
import TournamentTop10 from 'components/for_pages/TournamentPage/TournamentTop10'
import TournamentBanner from 'components/for_pages/TournamentPage/TournamentBanner'
import TournamentHeader from 'components/for_pages/TournamentPage/TournamentHeader'
interface Props{
  isRound: boolean
}
export default function TournamentPage(props: Props){

  const {t} = useTranslation()
  const router = useRouter()
  const [tournament, setTournament] = useState<ITournamentHistoryItem | null>(null)
  const [top, setTop] = useState<ITournamentHistoryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [top10, setTop10] = useState<IPagination<ITournamentTop10>>({data: [], total: 0})

  const init = async () => {
    const tournament = props.isRound ? await TournamentRepository.fetchRoundByIdId(router.query.id as string) : await TournamentRepository.fetchRoundByTournamentId(router.query.id as string)
    setTournament(tournament)
    setLoading(false)
   // const top10 = await TournamentRepository.fetchTop10({tournamentId: tournament.tournamentId, roundId: tournament.id }, 1, 10)

  }
  useEffect(() => {
    init()
  }, [router.query.id])
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
        <TournamentHeader tournament={tournament}/>
        <TournamentBanner tournament={tournament}/>



        <div className={styles.columnsBottom}>
          <div className={styles.columnsLeft}>
            <TournamentProviders tournament={tournament}/>
            <TournamentGames tournament={tournament}/>

            <TournamentConditions tournament={tournament}/>
          </div>
          <div className={styles.columnsRight}>
            <TournamentTop10 tournament={tournament}/>
          </div>
        </div>


      </div>}
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context)
    }
  }
}
