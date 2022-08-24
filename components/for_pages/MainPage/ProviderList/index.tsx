import Slider from 'react-slick'
import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import Header from 'components/for_pages/Common/Header'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useAppContext} from 'context/state'
import GameListRepository from 'data/repositories/GameListRepository'
import ContentLoader from 'components/ui/ContentLoader'
import {useTranslation} from 'next-i18next'
import {IGameProviderTop3} from 'data/interfaces/IGameProvider'
import ProviderMainCard from 'components/for_pages/MainPage/ProviderMainCard'
import Converter from 'utils/converter'

interface Props {
  slider?: any
}

interface IItem {
  image: string
  label: string
  link: string
}


export default function ProviderMainList(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  let { slider } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [data, setData] = useState<IGameProviderTop3[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20
  useEffect(() => {
    console.log('Fetch')
    GameListRepository.fetchProvidersTop3().then(i => {
      console.log('Data', i)
      setLoading(false)
      setData(i)
    })
  }, [])
  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    adaptiveHeight: false,
    slidesToShow: context.isMobile ? 1 : 3,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [

    ]
  }
  const grouped = Converter.splitIntoGroups(data, 4)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header
          icon='/img/icons/providers.png'
          label={t('main_slider_providers')}
          shadowColor='blue'
          style={!context.isMobile ? 'withoutLength' : null}
          onPrev={() => slider.slickGoTo(currentIndex - 1)}
          onNext={() => slider.slickGoTo(currentIndex + 1)}
          slider />
      </div>
      {loading && data.length === 0 && <ContentLoader style={'block'} isOpen={true}/>}
      {!loading && data.length >0 && <HiddenXs>
        <div className={styles.sliderWrapper}>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {data.map((item, index) =>
            <ProviderMainCard  item={item} key={item.id}/>
          )}
        </Slider>
        </div>
      </HiddenXs>}
      <VisibleXs>
        <div className={styles.sliderWrapper}>
          <Slider {...settings} ref={slider1 => (slider = slider1)}>
            {grouped.map((group, index) => <div key={index} className={styles.group}>
              {group.map((item, index) =>
                <ProviderMainCard item={item} key={item.id}/>
              )}
            </div>)}
          </Slider>
        </div>

      </VisibleXs>
    </div>
  )
}
