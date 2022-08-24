import styles from './index.module.scss'
import { ITournamentHistoryItem} from 'data/interfaces/ITournamentHistory'
import {useTranslation} from 'next-i18next'
import Header from 'components/for_pages/Common/Header'
import {useAppContext} from 'context/state'
import { useRef, useState} from 'react'
import ContentLoader from 'components/ui/ContentLoader'
import HiddenXs from 'components/ui/HiddenXS'
import Slider from 'react-slick'
import VisibleXs from 'components/ui/VisibleXS'
import ProviderCard from 'components/for_pages/Common/ProviderCard'

interface Props {
  tournament: ITournamentHistoryItem
}

export default function TournamentProviders(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const providers = props.tournament.providers
  const [loading, setLoading] = useState<boolean>(false)

  const handleJoin = () => {

  }
  const settings = {
    className: `${styles.slider}`,
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
        breakpoint: 1360,
        settings: {
          slidesToShow: 6,
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
  return (
   <div className={styles.root}>
     <Header
       label={'Участвующие провайдеры'}
       style={!appContext.isMobile ? 'withoutLength' : null}
       onPrev={!appContext.isMobile ? () => sliderRef.current?.slickGoTo(currentIndex - 1) : null}
       onNext={!appContext.isMobile ? () => sliderRef.current?.slickGoTo(currentIndex + 1) : null}
       slider={!appContext.isMobile} />
     {loading  && <ContentLoader style={'block'} isOpen={true}/>}
     {!loading  && <HiddenXs>
       <div className={styles.sliderWrapper}>
         <Slider {...settings} ref={sliderRef}>
           {providers.map((item, index) =>
             <ProviderCard item={item} key={item.id}/>
           )}
         </Slider>
       </div>
     </HiddenXs>}
     <VisibleXs>
       <div className={styles.overflow}>
         {providers.map((item, index) =>
           <ProviderCard item={item} key={item.id}/>
         )}
       </div>
     </VisibleXs>
   </div>

  )
}
