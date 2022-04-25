import InputSearch from 'components/ui/Inputs/InputSearch'
import styles from './index.module.scss'
import { Col } from 'react-grid-system'
import classNames from 'classnames'
import {useEffect, useState} from 'react'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import GameListRepository from 'data/repositories/GameListRepository'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import ProviderCard from 'components/for_pages/Common/ProviderCard'
import GameCategoryCard from 'components/for_pages/Common/GameCategoryCard'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'
import DropdownFilter from 'components/for_pages/Common/Filter/DropdownFilter'
import {Routes} from 'types/routes'
import {useFavoriteContext} from 'context/favorite_state'
import {useAppContext} from 'context/state'
interface IGame{
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
  onSearch?: (value: string) => void
}
const GameCategoryStaticCard = (props: {icon: string, label: string, link: string, quantity: number}) => {
  const active = useIsActiveLink(props.link)
  return(
    <Link href={props.link}>
    <a  className={classNames(styles.staticCard, {[styles.active]: active})}>
      <div className={styles.left}>
        <div className={styles.icon}><img src={props.icon} alt=''/></div>
        <div className={styles.label}>{props.label}</div>
      </div>
      <div className={styles.quantity}>
        {props.quantity}
      </div>
    </a>
    </Link>
  )
}
export default function Filter(props: Props) {
  const favoriteContext = useFavoriteContext()
  const appContext = useAppContext()
  const [providers, setProviders] = useState<IGameProvider[]>([])
  const [categories, setCategories] = useState<IGameCategory[]>([])
  useEffect(() => {
    GameListRepository.fetchProviders().then(i => setProviders(i.data ?? []))
    GameListRepository.fetchCategories().then(i => setCategories(i.data ?? []))
  }, [])


  const games = [
    ...(appContext.user ? [{icon: '/img/Filter/icons/24.svg', label: 'Последние игры', link: Routes.catalogLast, quantity: 0}] : []),
    {icon: '/img/Filter/icons/top.svg', label: 'ТОП игры', link: Routes.catalogTop, quantity: 0},
    ...(appContext.user ? [{icon: '/img/Filter/icons/favorite.svg', label: 'Избранные', link: Routes.catalogFavorite, quantity: favoriteContext.store.games.length}] : []),
    {icon: '/img/Filter/icons/favorite.svg', label: 'Избранные', link: Routes.catalogFavorite, quantity: favoriteContext.store.games.length},
  ]

  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  return (
    <>
    <Col className={classNames(styles.col, {[styles.none]: true})}>
      <div className={classNames(styles.root, props.className)}>

         <InputSearch placeholder='Поиск' onChange={props.onSearch}/>
         {games.map((item, index) =>
          <GameCategoryStaticCard key={index} icon={item.icon} label={item.label} link={item.link} quantity={item.quantity}/>
         )
         }
         <div className={styles.categoriesLbl}>
          КАТЕГОРИИ
         </div>
         <div className={styles.categories}>
         {categories.map((item, index) =>
           <GameCategoryCard key={item.id} item={item}/>
         )}
         </div>
         <div className={styles.categoriesLbl}>
          ПРОВАЙДЕРЫ
         </div>
         <div className={styles.providers}>
         {providers.map((item, index) => <ProviderCard key={item.id} item={item}/>)}
         </div>
      </div>
    </Col>
    <div className={classNames(styles.mobile, {[styles.none]: !props.showMobile})}>
        <div className={styles.search}>
          <InputSearch placeholder='Поиск' onChange={props.onSearch}/>
          <div className={styles.filters}>
          <DropdownFilter options={categories.map(i => ({label: i.name, link: Routes.catalogCategory(i.id) }))} label='Категория' allOption
           onAll={() => setCategory('')} onChange={(item) => setCategory(item.label)} activeTab={category} type='category'/>
          <DropdownFilter options={providers.map(i => ({label: i.name, link: Routes.catalogProvider(i.id) }))} label='Провайдеры' allOption
            onAll={() => setProvider('')}
           onChange={(item) => setProvider(item.label)} activeTab={provider} type='provider'/>
        </div>
        </div>
        {games.map((item, index) =>
          <GameCategoryStaticCard key={index} icon={item.icon} label={item.label} link={item.link} quantity={item.quantity}/>
         )
         }
    </div>
    </>
  )
}
