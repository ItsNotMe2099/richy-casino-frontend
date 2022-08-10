import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useEffect, useRef, useState } from 'react'
import { IPagination, ISwitchFilterItem } from 'types/interfaces'
import GameListRepository from 'data/repositories/GameListRepository'
import { IGameWin } from 'data/interfaces/IGameWin'
import New from 'components/svg/New'
import Calendar from 'components/svg/Calendar'
import Top from 'components/svg/Top'
import { Routes } from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import { IGame } from 'data/interfaces/IGame'
import GamesList from 'components/for_pages/CatalogPage/GamesList'
import { useTranslation } from 'next-i18next'
import ItemGame from 'components/for_pages/Common/ItemGame'
import {useInterval} from 'react-use'
enum GameSwitchFilterKey {

  WinNow = 'winNow',
  TopWeek = 'topWeek',
  TopMonth = 'topMonth'
}
const getId = (game: IGameWin | null)=>{
  return `${game?.username}${game?.currencyIso}${game?.game?.id}${game?.winAmount}`
}
const Item = (prop: { item: IGameWin }) => {

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <ItemGame item={prop.item.game}/>
      </div>
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

interface Props {
}

export default function GamesListTop(props: Props) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [latestWin, setLatestWin] = useState<IGameWin[]>([])
  const [top, setTop] = useState<IPagination<IGame>>({ data: [], total: 0 })
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState<GameSwitchFilterKey>(GameSwitchFilterKey.WinNow)
  const latestWinRef = useRef<IGameWin[]>([])

  const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const allLink = Routes.catalogTop
  const currentPage = useIsActiveLink(allLink)
  const limit = 12
  const filters: ISwitchFilterItem<GameSwitchFilterKey>[] = [
    { label: t('catalog_list_top_tab_win_now'), value: GameSwitchFilterKey.WinNow, icon: <New /> },
    { label: t('catalog_list_top_tab_week'), value: GameSwitchFilterKey.TopWeek, icon: <Top /> },
    { label: t('catalog_list_top_tab_month'), value: GameSwitchFilterKey.TopMonth, icon: <Calendar /> },
  ]
  const sliderRef = useRef<Slider>(null)
  useEffect(() => {
    latestWinRef.current = latestWin
  }, [latestWin])
  useEffect(() => {
    setLoading(true)
    switch (filter) {
      case GameSwitchFilterKey.TopMonth:
        GameListRepository.fetchTopMonth(1, limit).then(i => {
          setTop(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.TopWeek:
        GameListRepository.fetchTopWeek(1, limit).then(i => {
          setTop(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.WinNow:
        GameListRepository.fetchLatestWinGames().then(i => {
          setLatestWin(i)
          setLoading(false)
          setIsUpdating(false)
        })

        break
    }

  }, [filter])
  useInterval(() => {
    setIsUpdating(true)
    GameListRepository.fetchLatestWinGames().then(data => {
      const currentData = latestWinRef.current
      if(data.length > 0 && currentData.find(i => getId(i) === getId(data[0])) ){
        setLoading(false)
        setIsUpdating(false)
        return
      }
      const setNewData = [data[0], ...currentData]
      setNewData.pop()
      setLatestWin(setNewData)
      setLoading(false)
      setIsUpdating(false)
    })

  }, !isUpdating && filter === GameSwitchFilterKey.WinNow  ? 2000 : null)
  const handleChangeFilter = (item: GameSwitchFilterKey) => {
    setTop({ data: [], total: 0 })
    setFilter(item)
  }
  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    let res: IPagination<IGame> = { data: [], total: 0 }
    switch (filter) {
      case GameSwitchFilterKey.TopMonth:
        res = await GameListRepository.fetchTopMonth(newPage, limit)
        break
      case GameSwitchFilterKey.TopWeek:
        res = await GameListRepository.fetchTopWeek(newPage, limit)
        break
    }

    setTop(data => ({ data: [...data.data, ...res.data], total: res.total }))
    setLoading(false)
  }


  const settings = {
    className: `${styles.list}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    adaptiveHeight: false,
    slidesToShow: 8,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 6,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 4,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 4,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          initialSlide: 0,
        },
      }
    ]
  }


  if (filter === GameSwitchFilterKey.WinNow) {

    return (
      <div className={styles.root}>
        <Header
          icon='/img/Contents/money.svg'
          label={t('catalog_list_top')}
          allLink={!currentPage ? allLink : null}
          shadowColor='red'
          style='fullOnlyOnMobile'
          onPrev={() => sliderRef.current?.slickGoTo(currentIndex - 1)}
          onNext={() => sliderRef.current?.slickGoTo(currentIndex + 1)}
          slider />
        <div className={styles.wrapper}>
          <SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter}
            active={filter} />
        </div>
        <>
          <HiddenXs>
            <div className={styles.sliderWrapper}>
            {latestWin.length > 0 && <Slider {...settings} ref={sliderRef}>
              {latestWin.map((item, index) =>
                <Item item={item} key={getId(item)} />
              )}
            </Slider>}
            </div>

          </HiddenXs>
          <VisibleXs>
            <div className={styles.overflow}>
              {latestWin.map((item, index) =>
                <Item item={item} key={getId(item)} />
              )}
            </div>
          </VisibleXs>
        </>
      </div>
    )
  }

  return (<GamesList title={t('catalog_list_top')}
    icon='/img/Contents/money.svg'
    allLink={!currentPage ? allLink : null}
    totalItems={top?.total}
    items={top?.data ?? []}
    loading={loading}
    onScrollNext={handleScrollNext}
    switchFilter={<SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter} active={filter} />}
  />)
}
