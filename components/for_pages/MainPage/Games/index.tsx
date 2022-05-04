import Slider from 'react-slick'
import styles from './index.module.scss'
import { useState } from 'react'
import Header from 'components/for_pages/Common/Header'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import Link from 'next/link'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { richyGames } from 'components/for_pages/Common/GameTypes/game-types'
import ItemGame from 'components/for_pages/Common/ItemGame'
import {Routes} from 'types/routes'
import {useAppContext} from 'context/state'

interface Props {
  slider?: any
}

interface IItem {
  image: string
  label: string
  link: string
}

interface OverflowSlideProps {
  item: IItem
}

export default function Games(props: Props) {
  const context = useAppContext()
  let { slider } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    slidesToShow: 6,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 570,
        settings: {
          slidesToShow: richyGames.length < 4 ? richyGames.length : 4,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: richyGames.length < 3 ? richyGames.length : 3,
        },
      }
    ]
  }

  const OverflowSlide = ({item}: OverflowSlideProps) => {

    const [inFavorite, setInFavorite] = useState(false)
    return (
      <Link key={item.link} href={item.link}>
        <a className={styles.slide} ><div><img src={item.image}/></div>
        <div className={styles.shade}>
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
        <div className={styles.container}>
        <div className={styles.btns}>
          <Button className={styles.btn} size='small' background='blueGradient500'>Играть</Button>
          <Button className={styles.demo} size='small' background='blackTransparent'>Демо</Button>
        </div>
        </div>
        </div>
          <img src={item.image}/>
          <div className={styles.label}>{item.label}</div>
        </a>
      </Link>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header
          icon='/img/Contents/gamepad.svg'
          label='Richy Games'
          shadowColor='blue'
          length={richyGames.length}
          allLink={Routes.richyGames}
          style={!context.isMobile ? 'withoutLength' : null}
          onPrev={!context.isMobile ? () => slider.slickGoTo(currentIndex - 1) : null}
          onNext={!context.isMobile ? () => slider.slickGoTo(currentIndex + 1) : null}
          slider={!context.isMobile} />
      </div>
      <HiddenXs>
        <div className={styles.sliderWrapper}>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {richyGames.map((item, index) =>
            <ItemGame slider item={{imageIconPreviewUrl: item.image}} link={item.link} key={index} richy/>
          )}
        </Slider>
        </div>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.overflow}>
          {richyGames.map((item, index) =>
            <ItemGame  item={{imageIconPreviewUrl: item.image}} link={item.link} key={index}/>
          )}
        </div>
      </VisibleXs>
    </div>
  )
}
