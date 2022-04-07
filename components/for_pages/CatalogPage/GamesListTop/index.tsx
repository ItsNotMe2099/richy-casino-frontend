import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
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
  items?: IGame[]
  slider?: any
}

export default function GamesListTop(props: Props) {

  let { slider } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const Item = (prop:{item: IGame}) => {

    return(
      <div className={styles.item}>
        <img src={prop.item.image} alt=''/>
        <div className={styles.label}>
          {prop.item.label}
        </div>
        <div className={styles.user}>
          Username
        </div>
        <div className={styles.win}>
          <span>Win:</span> 8410 Р
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
        shadowColor='red'
        style='fullOnlyOnMobile'
        onPrev={() => slider.slickGoTo(currentIndex - 1)}
        onNext={() => slider.slickGoTo(currentIndex + 1)}
        slider />
      <div className={styles.wrapper}><SwitchFilter top/></div>
      <HiddenXs>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {props.items && props.items.map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </Slider>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.overflow}>
          {props.items && props.items.map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </div>
      </VisibleXs>
    </div>
  )
}
