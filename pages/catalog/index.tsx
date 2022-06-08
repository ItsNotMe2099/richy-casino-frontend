import TopSlider from 'components/for_pages/CatalogPage/TopSlider'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'
import {GetServerSideProps} from 'next'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import BuyCrypto from 'components/for_pages/MainPage/BuyCrypto'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import GamesListLive from 'components/for_pages/CatalogPage/GamesListLive'
import GamesListAll from 'components/for_pages/CatalogPage/GamesListAll'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'

export default function CatalogPage() {
  const {t} = useTranslation()

  return (
    <WithGameFilterLayout showMobile top={<VisibleXs><TopSlider/></VisibleXs>}>
      <NextSeo title={t('page_index_title')}/>
            <HiddenXs><TopSlider/></HiddenXs>
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

    },
  }
}
