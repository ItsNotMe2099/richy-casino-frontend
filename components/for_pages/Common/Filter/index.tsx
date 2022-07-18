import InputSearch from 'components/ui/Inputs/InputSearch'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IGameProvider } from 'data/interfaces/IGameProvider'
import GameListRepository from 'data/repositories/GameListRepository'
import { IGameCategory } from 'data/interfaces/IGameCategory'
import ProviderCard from 'components/for_pages/Common/ProviderCard'
import GameCategoryCard from 'components/for_pages/Common/GameCategoryCard'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'
import DropdownFilter from 'components/for_pages/Common/Filter/DropdownFilter'
import { Routes } from 'types/routes'
import { useFavoriteContext } from 'context/favorite_state'
import { useAppContext } from 'context/state'
import Formatter from 'utils/formatter'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
interface IGame {
  label: string
  image: string
  top: boolean
  createdAt: string
  lastWin: string
  category: string
  provider: string
}

interface Props {
  className?: string
  showMobile?: boolean
  isSearch?: boolean
  onSearch?: (value: string) => void
}
const GameCategoryStaticCard = (props: { icon: string, label: string, link: string, quantity: number }) => {
  const appContext = useAppContext()
  const active = useIsActiveLink(props.link)
  return (
    <Link href={props.link} scroll={appContext.isMobile}>
      <a className={classNames(styles.staticCard, { [styles.active]: active })}>
        <div className={styles.left}>
          <div className={styles.icon}><img src={props.icon} alt='' /></div>
          <div className={styles.label}>{props.label}</div>
        </div>
        <div className={styles.quantity}>
          {props.quantity > -1 ? Formatter.formatNumber(props.quantity) : ''}
        </div>
      </a>
    </Link>
  )
}
export default function Filter(props: Props) {
  const favoriteContext = useFavoriteContext()
  const appContext = useAppContext()
  const { t } = useTranslation()
  const router = useRouter()
  const [providers, setProviders] = useState<IGameProvider[]>([])
  const [categories, setCategories] = useState<IGameCategory[]>([])
  const [categoryNewTotal, setCategoryNewTotal] = useState(0)
  const [categoryTopTotal, setCategoryTopTotal] = useState(0)
  useEffect(() => {
    GameListRepository.fetchProviders().then(i => setProviders(i.data ?? []))
    GameListRepository.fetchCategories().then(i => setCategories(i.data ?? []))
    GameListRepository.fetchTop().then(i => setCategoryTopTotal(i?.total ?? 0))
  }, [])

  useEffect(() => {
    if (appContext.auth) {
      GameListRepository.fetchLatestGames().then(i => setCategoryNewTotal(i?.total ?? 0))
    }
  }, [appContext.auth])

  const games = [
    ...(appContext.user ? [{ icon: '/img/Filter/icons/24.svg', label: t('catalog_filter_category_latest'), link: Routes.catalogLast, quantity: categoryNewTotal ?? -1 }] : []),
    { icon: '/img/Filter/icons/top.svg', label: t('catalog_filter_category_top'), link: Routes.catalogTop, quantity: categoryTopTotal ?? -1 },
    ...(appContext.user ? [{ icon: '/img/Filter/icons/favorite.svg', label: t('catalog_filter_category_favorite'), link: Routes.catalogFavorite, quantity: favoriteContext.store.games.length }] : []),
  ]

  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  const [showCategory, setShowCategory] = useState(false)
  const [showProviders, setShowProviders] = useState(false)

  const handleShowCategory = (item?: {  label: string,
    link?: string}) => {
      if(item){
     //   router.push('/catalog/category/[id]',`${item.link}`, {})
      }
    if (showCategory) {
      setShowCategory(false)
    }
    else {
      setShowCategory(true)
      setShowProviders(false)
    }
  }

  const handleShowProviders = () => {
    if (showProviders) {
      setShowProviders(false)
    }
    else {
      setShowProviders(true)
      setShowCategory(false)
    }
  }

  return (
    <>
      <div className={classNames(styles.col, { [styles.none]: true })}>
        <div className={classNames(styles.root, props.className)}>

          <InputSearch placeholder={t('catalog_filter_search_field')} onChange={props.onSearch} />
          {games.map((item, index) =>
            <GameCategoryStaticCard key={index} icon={item.icon} label={item.label} link={item.link} quantity={item.quantity} />
          )}

          <div className={styles.categoriesLbl}>
            {t('catalog_filter_categories')}
          </div>
          <div className={styles.categories}>
            {categories.map((item, index) =>
              <GameCategoryCard key={item.id} item={item} />
            )}
          </div>
          <div className={styles.categoriesLbl}>
            {t('catalog_filter_providers')}
          </div>
          <div className={styles.providers}>
            {providers.map((item, index) => <ProviderCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
      <div className={classNames(styles.mobile, { [styles.none]: !props.showMobile })}>
        <div className={styles.search}>
          <InputSearch placeholder={t('catalog_filter_search_field')} onChange={props.onSearch} />
          {!props.isSearch && <div className={styles.filters}>
            <DropdownFilter label={t('catalog_filter_categories_dropdown')} onClick={handleShowCategory}
              notActive
              onAll={() => setCategory('')} onChange={(item) => setCategory(item.label)} activeTab={category} type='category' />
            <DropdownFilter label={t('catalog_filter_providers_dropdown')}
              notActive
              onAll={() => setProvider('')} onClick={handleShowProviders}
              onChange={(item) => setProvider(item.label)} activeTab={provider} type='provider' />
          </div>}
          {showCategory &&
            <>
              <div className={styles.categoriesLbl}>
                {t('catalog_filter_categories')}
              </div>
              <div className={styles.categories}>
                {categories.map((item, index) =>
                  <GameCategoryCard key={item.id} item={item} onClick={() => setShowCategory(false)}/>
                )}
              </div>
            </>
          }
          {showProviders &&
            <>
              <div className={styles.categoriesLbl}>
                {t('catalog_filter_providers_dropdown')}
              </div>
              <div className={styles.providers}>
                {providers.map((item, index) => <ProviderCard key={item.id} item={item} onClick={() => setShowProviders(false)}/>)}
              </div>
            </>
          }
        </div>
        {!props.isSearch && games.slice(0, 1).map((item, index) =>
          <GameCategoryStaticCard key={index} icon={item.icon} label={item.label} link={item.link} quantity={item.quantity} />
        )}
        <div className={styles.categoriesStatic}>

        {!props.isSearch && games.length > 2 && games.slice(1, 3).map((item, index) =>
          <GameCategoryStaticCard key={index} icon={item.icon} label={item.label} link={item.link} quantity={item.quantity} />
        )}

        </div>
      </div>
    </>
  )
}
