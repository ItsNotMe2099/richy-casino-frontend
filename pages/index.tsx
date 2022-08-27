import styles from 'pages/index.module.scss'
import Layout from 'components/layout/Layout'
import Contents from 'components/for_pages/MainPage/Contents'
import Games from 'components/for_pages/MainPage/Games'
import GameCard from 'components/for_pages/MainPage/GameCard'
import Winners from 'components/for_pages/MainPage/Winners'
import Statistics from 'components/for_pages/MainPage/Statistics'
import GamesList, {MainGameListType} from 'components/for_pages/MainPage/GamesList'
import Tournament from 'components/for_pages/MainPage/Tournament'
import BuyCrypto from 'components/for_pages/MainPage/BuyCrypto'
import VisibleXs from 'components/ui/VisibleXS'
import {useTranslation} from 'next-i18next'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppContext} from 'context/state'
import {PaymentSwitchFilterKey, ProfileModalType} from 'types/enums'
import {PaymentHistoryModalArguments} from 'types/interfaces'
import ErrorBoundary from 'components/ui/ErrorBoundary'
import ProviderMainList from 'components/for_pages/MainPage/ProviderList'
import dynamic from 'next/dynamic'
import {AppContext} from 'next/app'
import { getStaticPropsTranslations} from 'utils/i18'
const DynamicTopSlider = dynamic(() => import('components/for_pages/MainPage/TopSlider'), {

})
const casinos = [
  {image: '/img/GamesList/hotline.png', label: 'hotline', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline2', provider: 'provider2', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline3', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline4', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline5', provider: 'provider2', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline6', provider: 'provider3', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline7', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline8', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline9', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline10', provider: 'provider3', category: 'category2'},
]

const live = [
  {image: '/img/GamesList/roulette.png', label: 'roulette', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette2', provider: 'provider2', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette3', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette4', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette5', provider: 'provider2', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette6', provider: 'provider3', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette7', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette8', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette9', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette10', provider: 'provider3', category: 'category2'},
]

export default function IndexPage() {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const router = useRouter()
  useEffect(() => {
    if(router.query.withdrawal){
      appContext.showModalProfile(ProfileModalType.paymentHistory, {filter: PaymentSwitchFilterKey.Applications} as PaymentHistoryModalArguments)
      router.replace('/', '/', {shallow: true})
    }

  }, [router.query])
  return (
        <Layout>
          <ErrorBoundary>
          <DynamicTopSlider/>
          </ErrorBoundary>
          <ErrorBoundary>
            <ErrorBoundary>
          <Contents/>
            </ErrorBoundary>
          </ErrorBoundary>
          <Games/>
          <div className={styles.lists}>
            <ErrorBoundary>
            <GamesList type={MainGameListType.All} label={t('main_games_list_casino_title')} icon='/img/Contents/casino.svg' shadowColor='red'/>
            </ErrorBoundary>
            <ErrorBoundary>
            <GamesList type={MainGameListType.Live} label={t('main_games_list_live_casino_title')} icon='/img/Contents/live.svg' shadowColor='blue'/>
            </ErrorBoundary>
          </div>
          <VisibleXs>
            <ErrorBoundary>
            <BuyCrypto/>
            </ErrorBoundary>
          </VisibleXs>
          <ErrorBoundary>
            <ProviderMainList/>
          </ErrorBoundary>
          <ErrorBoundary>
              <div className={styles.cards}>
                <GameCard poker/>
                <GameCard/>
              </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <Tournament/>
          </ErrorBoundary>
          <ErrorBoundary>
          <Winners/>
          </ErrorBoundary>
          <ErrorBoundary>
          <Statistics/>
          </ErrorBoundary>
        </Layout>
  )
}
export async function getStaticProps(context: AppContext) {
  return {
    props: {
      ...await getStaticPropsTranslations(context)
    }
  }
}
