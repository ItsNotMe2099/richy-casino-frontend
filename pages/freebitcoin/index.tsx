import PageTitle from 'components/for_pages/Common/PageTitle'
import Banner from 'components/for_pages/FreeBitcoin/Banner'
import Table from 'components/for_pages/FreeBitcoin/Table'
import {useEffect, useState} from 'react'
import {GetServerSideProps} from 'next'
import FreeBitcoinRepository from 'data/repositories/FreeBitcoinRepository'
import {IFreeBitcoinSlot} from 'data/interfaces/IFreeBitcoinSlot'
import {IFreeBitcoinHistory} from 'data/interfaces/IFreeBitcoinHistory'
import {IFreeBitcoinUserStatus} from 'data/interfaces/IFreeBitcoinUserStatus'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {NextSeo} from 'next-seo'
import ContentLoader from 'components/ui/ContentLoader'
import styles from 'pages/freebitcoin/index.module.scss'
import Head from 'next/head'

export default function FreeBitcoin() {
  const {t} = useTranslation()
  const context = useAppContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [slots, setSlots] = useState<IFreeBitcoinSlot[]>([])
  const [history, setHistory] = useState<IFreeBitcoinHistory[]>([])
  const [userStatus, setUserStatus] = useState<IFreeBitcoinUserStatus>(null)
  useEffect(() => {
    console.log('context.auth ', context.user )
    Promise.all([
      FreeBitcoinRepository.fetchSlots().then(i => setSlots(i)),
      FreeBitcoinRepository.fetchHistory().then(i => setHistory(i ?? [])),
      ...(context.auth ? [FreeBitcoinRepository.fetchUserStatus().then(i => setUserStatus(i))] : []),
    ]).then(() => setLoading(false))
  }, [context.auth])

  const [isShow, setIsShow] = useState(false)

  return (
    <WithGameFilterLayout>
      <Head>
        <meta name="twitter:title" content={t('seo_freebitcoin_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_freebitcoin_twitter_description')}/>
        <meta name="keywords" content={t('seo_freebitcoin_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_freebitcoin_title')}
        description={t('seo_freebitcoin_description')}
        openGraph={{
          title: t('seo_freebitcoin_og_title'),
          description: t('seo_freebitcoin_og_description'),
          site_name: t('seo_freebitcoin_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/',
        }}
      />
          <PageTitle icon='/img/Contents/bitcoin.svg' title={t('freebitcoin_title')}
                     onClick={() => isShow ? setIsShow(false) : setIsShow(true)} shadowColor='yellow'/>
      {loading && <ContentLoader style={'block'} isOpen={true}/>}
      {!loading &&   <><Banner/>
          <div className={styles.tables}>
            <div className={styles.table}><Table items={slots}/></div>
            <Table items={history} history/>
          </div>
            </>}
    </WithGameFilterLayout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {

    },
  }
}
