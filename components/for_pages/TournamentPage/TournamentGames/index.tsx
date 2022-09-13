import styles from './index.module.scss'
import { ITournamentHistoryItem} from 'data/interfaces/ITournamentHistory'
import {useTranslation} from 'next-i18next'
import Header from 'components/for_pages/Common/Header'
import {useAppContext} from 'context/state'
import { useRef, useState} from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import Slider from 'react-slick'
import VisibleXs from 'components/ui/VisibleXS'
import ItemGame from 'components/for_pages/Common/ItemGame'
import classNames from 'classnames'

interface Props {
  tournament: ITournamentHistoryItem
}

export default function TournamentGames(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const games = props.tournament?.providers?.map(i => i.games)?.flat() ?? []


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
    slidesToShow: 5,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 1360,
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
  return (
   <div className={styles.root}>
     <Header
       label={t('tournament_page_games')}
       style={!appContext.isMobile ? 'withoutLength' : null}
       onPrev={!appContext.isMobile ? () => sliderRef.current?.slickGoTo(currentIndex - 1) : null}
       onNext={!appContext.isMobile ? () => sliderRef.current?.slickGoTo(currentIndex + 1) : null}
       slider={!appContext.isMobile} />
     { <HiddenXs>
       <div className={styles.sliderWrapper}>
         <Slider {...settings} ref={sliderRef}>
           {games.map((item, index) =>
             <ItemGame item={item} key={item.id}/>
           )}
         </Slider>
       </div>
     </HiddenXs>}
     <VisibleXs>
       <div className={classNames(styles.overflow, {[styles.center]: games.length < 3})}>
       {games.map((item, index) =>
           <ItemGame item={item} key={item.id}/>
         )}
       </div>
     </VisibleXs>
   </div>

  )
}
