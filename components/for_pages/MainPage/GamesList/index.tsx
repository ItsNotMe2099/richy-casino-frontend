import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import { useState } from 'react'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import DropdownMenu from './DropdownMenu'

interface IItem {
  image: string
  label: string
  category: string
  provider: string
}

interface Props {
  icon: string
  label: string
  items: IItem[]
  shadowColor?: 'red' | 'blue' | 'yellow'
}

export default function GamesList(props: Props) {

  const Item = (prop:{item: IItem}) => {

    const [inFavorite, setInFavorite] = useState(false)

    return(
      <div className={styles.item}>
        <div className={styles.shade}></div>
        <Button
          onClick={() => inFavorite ? setInFavorite(false) : setInFavorite(true)}
          className={classNames(styles.favorite, {[styles.active]: inFavorite})}
          size='superExtraSmall'
          background='blackTransparent'>
          {inFavorite ?
            <img src='/img/GamesList/star-fill.svg' alt=''/>
            :
            <img src='/img/GamesList/star-stroke.svg' alt=''/>}
        </Button>
        <div className={styles.btns}>
          <Button className={styles.btn} size='small' background='blueGradient500'>Играть</Button>
          <Button className={styles.demo} size='small' background='blackTransparent'>Демо</Button>
        </div>
        <img src={prop.item.image} alt=''/>
      </div>
    )
  }

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

  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  const items =
    props.items.filter(item => ((category === item.category && provider === '') ||
      (category === '' && provider === item.provider) ||
      (category === item.category && provider === item.provider) ||
      (provider === '' && category === '')
    ))

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    rows: 2,
    slidesToScroll: 3,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
  }

  const games = [
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'chess',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'vr',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'blackjack',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: '6'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'truelab'},
  ]

  return (
    <div className={classNames(styles.root, {[styles.none]: props.items.length === 0})}>
      <Header icon={props.icon} label={props.label} length={props.items.length} shadowColor={props.shadowColor}/>
      <HiddenXs>
        <>
          <div className={styles.filters}>
            <DropdownMenu className={styles.drop} options={categories} label='Категория' allOption
                          onAll={() => setCategory('')} onChange={(item) => setCategory(item.label)} activeTab={category} type='category' items={games}/>
            <DropdownMenu className={styles.drop} provs={providers} label='Провайдеры' allOption items={games}
                          onAll={() => setProvider('')}
          onChange={(item) => setProvider(item.label)} activeTab={provider} type='provider'/>
          </div>
          <div className={styles.list}>
            {items.slice(0, 9).map((item, index) =>
              <Item item={item} key={index}/>
            )}
          </div>
        </>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.mobile}>
            {items.map((item, index) =>
              <Item item={item} key={index}/>
            )}
        </div>
      </VisibleXs>
    </div>
  )
}
