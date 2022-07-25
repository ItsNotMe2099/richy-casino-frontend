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
import Head from 'next/head'

export default function CatalogPage() {
  const {t} = useTranslation()

  return (
    <WithGameFilterLayout showMobile top={<VisibleXs><TopSlider/></VisibleXs>}>
      <Head>
        <meta name="twitter:title" content={t('seo_catalog_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_catalog_twitter_description')}/>
        <meta name="keywords" content={t('seo_catalog_keywords')}/>
      </Head>
      <NextSeo
               title={t('seo_catalog_title')}
               description={t('seo_catalog_description')}
               openGraph={{
                 title: t('seo_catalog_og_title'),
                 description: t('seo_catalog_og_description'),
                 site_name: t('seo_catalog_og_site_name'),
                 type: 'website',
                 locale: 'en_US',
                 url: 'https://richy.casino/catalog',
               }}
      />
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
