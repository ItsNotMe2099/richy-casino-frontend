import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
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

export default function Bonuses(){

  const {t} = useTranslation()

  const context = useAppContext()

  const isMobile = context.isMobile

  const [ref, { width, height }] = useMeasure()

  return (
    <Layout>
      <NextSeo title={t('page_games_bonus_title')}/>
        <div className={styles.root} ref={ref}>
          <div className={styles.title}>{t('page_games_bonus_title')}</div>
          <div className={styles.grid}>
            <BonusSlide/>
            {context.banners.map((item, index) => <div className={styles.rootSlide} key={index}>
            <div className={styles.item}>
          {(item.imageDesktopUrl || item.imageMobileUrl) && <Image src={item.imageDesktopUrl || item.imageMobileUrl} layout={'fill'}/>}

          <div className={styles.left}>
          <div className={classNames(styles.label, {[styles.second]: index > 0})} style={{fontSize: isMobile ? `${width / 24}px` : `${width / 54}px`}}>
            {item.title}
          </div>
          <div className={classNames(styles.btn, {[styles.alt]: index === 1})} style={{fontSize: isMobile ? `${width / 25}px` : `${width / 77}px`}}>
            <Button size='normal' background={index === 1 ? 'blueGradient500' : 'white'} href={item.redirectUrl}>{item.textButton}</Button>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
