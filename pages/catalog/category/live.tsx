import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import GamesListLive from 'components/for_pages/CatalogPage/GamesListLive'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {AppContext} from 'next/app'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  category: IGameCategory
}

export default function CatalogPage(props: Props) {
  const {t} = useTranslation()
  return (
    <WithGameFilterLayout showMobile>
      <Head>
        <meta name="twitter:title" content={t('seo_live_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_live_twitter_description')}/>
        <meta name="keywords" content={t('seo_live_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_live_title')}
        description={t('seo_live_description')}
        openGraph={{
          title: t('seo_live_og_title'),
          description: t('seo_live_og_description'),
          site_name: t('seo_live_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/catalog/category/live',
        }}
      />
         <GamesListLive/>
    </WithGameFilterLayout>
  )
}

export async function getServerSideProps(context: AppContext) {
  return {
    props: {
      ...await getServerSideTranslation(context)
    }
  }
}
