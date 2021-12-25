import InputSearch from 'components/ui/Inputs/InputSearch'
import styles from './index.module.scss'
import { Col } from 'react-grid-system'
import classNames from 'classnames'
import DropdownMenu from 'components/ui/DropdownMenu'
import { useState } from 'react'

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
  path?: string
  items?: IGame[]
  className?: string
  state?: boolean
  mobile?: boolean
  onClick?: () => void
}

export default function Filter(props: Props) {

  const GameFilter = (prop: {icon: string, label: string, items: IGame[]}) => {
    return(
    <div className={styles.gameFilter}>
      <div className={styles.left}>
        <div className={styles.icon}><img src={prop.icon} alt=''/></div>
        <div className={styles.label}>{prop.label}</div>
      </div>
      <div className={styles.quantity}>
        {prop.items.length}
      </div>
    </div>
    )
  }

  const CategoryFilter = (prop: {icon: string, label: string,  items: IGame[]}) => {

    return (
    <div className={styles.categoryFilter}>
      <div className={styles.left}>
        <div className={styles.icon}><img src={prop.icon} alt=''/></div>
        <div className={styles.label}>{prop.label}</div>
      </div>
      <div className={styles.quantity}>
        {prop.items.length}
      </div>
    </div>
    )
  }

  const Netent = () => {
    return (
    <svg width="47" height="18" viewBox="0 0 47 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39.8979 3.81079H46.5V5.83782H44.1969V14.4324H42.201V5.83782H39.8979V3.81079Z"/>
      <path d="M31.377 3.81079H33.1426L37.0578 10.2973V3.81079H39.0537V14.4324H37.2881L33.3729 7.94593V14.4324H31.377V3.81079Z"/>
      <path d="M25.0816 3.81081H30.3018V5.83784H25.6957V8.10811H29.6109V10.1351H25.6957V12.4054H30.3018V14.4324H25.0816V18H24.6978V0H25.0816V3.81081Z"/>
      <path d="M9.20703 3.8028H15.7755V5.83483H11.2692V8.11072H15.1645V10.1428H11.2692V12.4186H15.7755V14.4507H9.20703V3.8028Z"/>
      <path d="M0.5 3.8028H2.33305L6.15192 10.3053V3.8028H8.13772V14.4507H6.38105L2.48581 7.94816V14.4507H0.5V3.8028Z"/>
      <path d="M16.6919 3.8028H23.2603V5.83483H20.969V14.4507H18.9832V5.83483H16.6919V3.8028Z"/>
    </svg>
    )
  }
  const providers = [
    {icon: <Netent/>, label: 'Netent'},
    {icon: <Netent/>, label: 'Gamomat'},
    {icon: <Netent/>, label: 'Truelab'},
    {icon: <Netent/>, label: 'Other'},
    {icon: <Netent/>, label: 'Other1'},
    {icon: <Netent/>, label: 'Other3'},
    {icon: <Netent/>, label: 'N4'},
    {icon: <Netent/>, label: '5'},
    {icon: <Netent/>, label: '6'},
    {icon: <Netent/>, label: '8'}
  ]

  const games = [
    {icon: '/img/Filter/icons/24.svg', label: 'Последние игры'},
    {icon: '/img/Filter/icons/top.svg', label: 'ТОП игры'},
    {icon: '/img/Filter/icons/favorite.svg', label: 'Избранные'},
  ]

  const categories = [
    {icon: '/img/Filter/icons/all.svg', label: 'Все игры'},
    {icon: '/img/Filter/icons/richy.svg', label: 'Richy Games'},
    {icon: '/img/Filter/icons/slots.svg', label: 'Слоты'},
    {icon: '/img/Filter/icons/new.svg', label: 'Новые'},
    {icon: '/img/Filter/icons/roulette.svg', label: 'Рулетки'},
    {icon: '/img/Filter/icons/live.svg', label: 'Live Casino'},
    {icon: '/img/Filter/icons/blackjack.svg', label: 'Блек Джек'},
    {icon: '/img/Filter/icons/tabletop.svg', label: 'Настольные'},
    {icon: '/img/Filter/icons/poker.svg', label: 'Покер'},
    {icon: '/img/Filter/icons/chess.svg', label: 'Шахматы'},
    {icon: '/img/Filter/icons/vr.svg', label: 'Виртуальные игры'},
    {icon: '/img/Filter/icons/lottery.svg', label: 'Лотереи'},
    {icon: '/img/Filter/icons/other.svg', label: 'Другие'},
  ]

  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  return (
    <>
    <Col className={classNames(styles.col, {[styles.none]: (!props.state || props.mobile)})}>
      <div className={classNames(styles.root, props.className)}>
          <div className={styles.close}>
            <img src='/img/icons/close.svg' alt='' onClick={props.onClick}/>
          </div>
         <InputSearch placeholder='Поиск'/>
         {games.map((item, index) => 
          <GameFilter key={index} icon={item.icon} label={item.label} items={props.items}/>
         )
         }
         <div className={styles.categoriesLbl}>
          КАТЕГОРИИ
         </div>
         <div className={styles.categories}>
         {categories.map((item, index) =>
          <CategoryFilter key={index} icon={item.icon} label={item.label} items={props.items}/>
         )}
         </div>
         <div className={styles.categoriesLbl}>
          ПРОВАЙДЕРЫ
         </div>
         <div className={styles.providers}>
         {providers.map((item, index) =>
            <div className={styles.provider} key={index}>
              <div className={styles.iconProvider}>
                {item.icon}
              </div>
              <div className={styles.quantity}>
                {props.items.length}
              </div>
            </div>
         )}
         </div>
      </div>
    </Col>
    <div className={classNames(styles.mobile, {[styles.none]: !props.mobile})}>
        <div className={styles.search}>
          <InputSearch placeholder='Поиск'/>
          <div className={styles.filters}>
          <DropdownMenu tabs={categories} label='Категория' allOption
           onAll={() => setCategory('')} onChange={(item) => setCategory(item.label)} activeTab={category} type='category'/>
          <DropdownMenu tabs={providers} label='Провайдеры' allOption
            onAll={() => setProvider('')}
           onChange={(item) => setProvider(item.label)} activeTab={provider} type='provider'/>
        </div>
        </div>
        {games.map((item, index) => 
          <GameFilter key={index} icon={item.icon} label={item.label} items={props.items}/>
         )
         }
    </div>
    </>
  )
}
