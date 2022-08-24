import styles from 'pages/bonuses/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import Image from 'next/image'
import { useMeasure } from 'react-use'
import Head from 'next/head'
import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'

export default function Bonuses(){

  const {t} = useTranslation()

  const context = useAppContext()

  const isMobile = context.isMobile

  const [ref, { width, height }] = useMeasure()

  return (
    <Layout>
      <Head>
        <meta name="twitter:title" content={t('seo_bonuses_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_bonuses_twitter_description')}/>
        <meta name="keywords" content={t('seo_bonuses_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_bonuses_title')}
        description={t('seo_bonuses_description')}
        openGraph={{
          title: t('seo_bonuses_og_title'),
          description: t('seo_bonuses_og_description'),
          site_name: t('seo_bonuses_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/bonuses',
        }}
      />
        <div className={styles.root} >
          <div className={styles.title}>{t('page_games_bonus_title')}</div>
          <div className={styles.grid}>
            <BonusSlide/>
            {context.banners.map((item, index) => <div className={styles.rootSlide} key={index}>
            <div className={styles.item} ref={ref}>
          {(item.imageDesktopUrl || item.imageMobileUrl) && <Image src={isMobile ? item.imageMobileUrl || item.imageDesktopUrl : item.imageDesktopUrl || item.imageMobileUrl}  layout={'fill'}/>}

          <div className={styles.left}>
          <div className={classNames(styles.label, {[styles.second]: index > 0})} style={{fontSize: `${width / 24}px`}}>
            {item.title}
          </div>
          <div className={classNames(styles.btn)} style={{fontSize: isMobile ? `${width / 22}px` : `${width / 38 > 18 ? 18 : width / 38}px`}}>
            <Button size='normal' background={'white'} href={item.redirectUrl}>{item.textButton}</Button>
          </div>
        </div>
        </div>
        </div>
            )}
          </div>
        </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
