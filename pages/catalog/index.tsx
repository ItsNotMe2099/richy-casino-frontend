import TopSlider from 'components/for_pages/CatalogPage/TopSlider'
import styles from 'pages/catalog/index.module.scss'
import {Row} from 'react-grid-system'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'
import {GetServerSideProps} from 'next'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import BuyCrypto from 'components/for_pages/MainPage/BuyCrypto'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import GamesListLive from 'components/for_pages/CatalogPage/GamesListLive'
import GamesListAll from 'components/for_pages/CatalogPage/GamesListAll'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {getServerSideTranslation} from 'utils/i18'

export default function CatalogPage() {

  const money = '25 572 257 ₽'

  return (
    <WithGameFilterLayout showMobile top={<VisibleXs><TopSlider money={money}/></VisibleXs>}>
       <Row className={styles.row}>
            <HiddenXs><TopSlider money={money}/></HiddenXs>
          </Row>
          <GamesListTop />
          <VisibleXs><BuyCrypto/></VisibleXs>
          <GamesListAll />
          <GamesListLive />
          <GamesListRichy />
    </WithGameFilterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
