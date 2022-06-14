import Slider from 'react-slick'
import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import Header from 'components/for_pages/Common/Header'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import ItemGame from 'components/for_pages/Common/ItemGame'
import {Routes} from 'types/routes'
import {useAppContext} from 'context/state'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'
import ContentLoader from 'components/ui/ContentLoader'
import {useTranslation} from 'next-i18next'

interface Props {
  slider?: any
}

interface IItem {
  image: string
  label: string
  link: string
}


export default function Games(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  let { slider } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20
  useEffect(() => {
    GameListRepository.fetchRichy( 1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])
  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    slidesToShow: 8,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
        },
      }
    ]
  }


  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header
          icon='/img/Contents/gamepad.svg'
          label={t('main_slider_richy_games')}
          shadowColor='blue'
          length={data.total}
          allLink={Routes.richyGames}
          style={!context.isMobile ? 'withoutLength' : null}
          onPrev={!context.isMobile ? () => slider.slickGoTo(currentIndex - 1) : null}
          onNext={!context.isMobile ? () => slider.slickGoTo(currentIndex + 1) : null}
          slider={!context.isMobile} />
      </div>
      {loading && data.total === 0 && <ContentLoader style={'block'} isOpen={true}/>}
      <HiddenXs>
        <div className={styles.sliderWrapper}>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {data.data.map((item, index) =>
            <ItemGame slider item={item} key={item.id}/>
          )}
        </Slider>
        </div>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.overflow}>
          {data.data.map((item, index) =>
            <ItemGame slider item={item} key={item.id}/>
          )}
        </div>
      </VisibleXs>
    </div>
  )
}
