import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
import styles from 'pages/bonuses/index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Button from 'components/ui/Button'
import classNames from 'classnames'

export default function Bonuses(){

  const {t} = useTranslation()

  const items =[
    {label: <div>Лучшие игры от Richy</div>, image: '/img/TopSlider/banner@3x.png'},
    {label: <div className={styles.itemLabel}>Spin the <span className={styles.spin}>wheel of fortune</span><br/> every day and get a<br/> guaranteed <span className={styles.spin}>prizes</span></div>, image: '/img/TopSlider/wheel@3x.png'},
    {label: <div className={styles.itemLabel}>Try your luck in the <span className={styles.lottery}>most profitable</span><br/> cryptocurrency lottery<br/> and get bonuses</div>, image: '/img/TopSlider/lottery@3x.png'},
  ]

  return (
    <Layout>
      <NextSeo title={t('page_index_title')}/>
        <div className={styles.root}>
          <div className={styles.title}>Бонусы</div>
          <div className={styles.grid}>
            <BonusSlide/>
            {items.map((item, index) =>
              <div className={styles.rootSlide} key={index}>
                <div className={styles.item} style={{backgroundImage: `url(${item.image})`}}>
                  <div className={styles.left}>
                    <div className={classNames({[styles.label]: index == 0})}>
                      {item.label}
                    </div>
                    <div className={styles.btn}>
                      <Button size='normal' background='white'>Начать играть</Button>
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
