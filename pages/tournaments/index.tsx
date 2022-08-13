import styles from 'pages/tournaments/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import {ITournamentHistory, ITournamentRoundStatus} from 'data/interfaces/ITournamentHistory'
import TournamentCard from 'components/for_pages/TournamentListPage/TournamentCard'
import classNames from 'classnames'
import ContentLoader from 'components/ui/ContentLoader'
const BlockHeading = (props: {title: string}) => {
  return (<div className={classNames(styles.heading)}>

    <div className={classNames(styles.headingIcon)}>
      <div className={styles.headingIconShadow}>
        <img src={'/img/shadows/yellow-tournament.png'} alt=''/>
      </div>
      <img src={'/img/Contents/cup.svg'} alt=''/>
    </div>
    <div className={styles.headingTitle}>
      {props.title}
    </div>
  </div>)
}
export default function Tournaments(){

  const {t} = useTranslation()
  const [listActive, setListActive] = useState<ITournamentHistory[]>([])
  const [listFinished, setListFinished] = useState<ITournamentHistory[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    TournamentRepository.fetchHistory(1, 100).then(i => {
      console.log('Loadsadasd', i)
      setListActive(i.data.filter(i => i.status === ITournamentRoundStatus.Active))
      setListFinished(i.data.filter(i => i.status === ITournamentRoundStatus.Complete))
      setLoading(false)
    })
  }, [])
  console.log('listActive', listActive)
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
     <div className={styles.block}>
            <BlockHeading title={t('page_tournament_title')}/>
            <div className={styles.list}>
              {listActive.map(i => <TournamentCard key={i.id} tournament={i}/>)}
            </div>

          </div>
          <div className={styles.block}>
            <BlockHeading title={t('page_tournament_title')}/>
            <div className={styles.list}>
              {listFinished.map(i => <TournamentCard key={i.id} tournament={i} disabled/>)}
            </div>

          </div>
        </div>}
    </Layout>
  )
}
