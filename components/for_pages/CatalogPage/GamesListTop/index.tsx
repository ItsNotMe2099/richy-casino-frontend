import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useEffect, useRef, useState} from 'react'
import { ISwitchFilterItem} from 'types/interfaces'
import GameListRepository from 'data/repositories/GameListRepository'
import {IGameWin} from 'data/interfaces/IGameWin'
import New from 'components/svg/New'
import Calendar from 'components/svg/Calendar'
import Top from 'components/svg/Top'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
enum GameSwitchFilterKey{

  WinNow = 'winNow',
  TopWeek = 'topWeek',
  TopMonth = 'topMonth'
}


interface Props {
}

export default function GamesListTop(props: Props) {


  const [currentIndex, setCurrentIndex] = useState(0)
  const [data, setData] = useState<IGameWin[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState<GameSwitchFilterKey>(GameSwitchFilterKey.WinNow)
  const allLink = Routes.catalogTop
  const currentPage = useIsActiveLink(allLink)

  const filters: ISwitchFilterItem<GameSwitchFilterKey>[] = [
    {label: 'Выигрывают сейчас', value: GameSwitchFilterKey.WinNow, icon: <New/>},
    {label: 'Топ игр за неделю', value: GameSwitchFilterKey.TopWeek, icon: <Top/>},
    {label: 'Топ игр месяца', value: GameSwitchFilterKey.TopMonth, icon: <Calendar/>},
  ]
  const sliderRef = useRef<Slider>(null)
  useEffect(() => {
    GameListRepository.fetchLatestWinGames().then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])
  const handleChangeFilter = (item: GameSwitchFilterKey) => {
    setFilter(item)
  }
  const Item = (prop:{item: IGameWin}) => {

    return(
      <div className={styles.item}>
        <img src={prop.item.game.imageIconPreviewUrl} alt=''/>
        <div className={styles.label}>
          {prop.item.game.name}
        </div>
        <div className={styles.user}>
          {prop.item.username}
        </div>
        <div className={styles.win}>
          <span>Win:</span> {prop.item.winAmount} {prop.item.currencyIso?.toUpperCase()}
        </div>
      </div>
    )
  }

  const settings = {
    className: `${styles.list}`,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
    dotsClass: `${styles.dots}`,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),

  }

  return (
    <div className={styles.root}>
      <Header
        icon='/img/Contents/money.svg'
        label='ТОП игры'
        allLink={!currentPage? allLink : null}
        shadowColor='red'
        style='fullOnlyOnMobile'
        onPrev={() => sliderRef.current?.slickGoTo(currentIndex - 1)}
        onNext={() => sliderRef.current?.slickGoTo(currentIndex + 1)}
  slider />
      <div className={styles.wrapper}><SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter} active={filter}/></div>
      <HiddenXs>
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </Slider>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.overflow}>
          {data.map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </div>
      </VisibleXs>
    </div>
  )
}
