import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
import Tournament from 'components/for_pages/MainPage/Tournament'
import Winners from 'components/for_pages/MainPage/Winners'
import styles from 'pages/tournaments/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'

export default function Tournaments(){

  const {t} = useTranslation()

  return (
    <Layout>
      <NextSeo title={t('page_index_title')}/>
        <div className={styles.root}>
          <div className={styles.title}>Турниры</div>
          <Tournament balance='0,00000001 BTC'/>
          <Winners/>
        </div>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
