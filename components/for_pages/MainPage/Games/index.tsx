import Slider from 'react-slick'
import Slide from './Slide'
import styles from './index.module.scss'
import { useState } from 'react'
import Header from 'components/for_pages/Common/Header'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import Link from 'next/link'
import Button from 'components/ui/Button'
import classNames from 'classnames'

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

  let { slider } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const items = [
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
    {image: '/img/Games/blackjack.svg', label: 'Blackjack', link: '#'},
  ]

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: items.length < 6 ? items.length : 6,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 570,
        settings: {
          slidesToShow: items.length < 4 ? items.length : 4,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: items.length < 3 ? items.length : 3,
        },
      }
    ]
  }

  const OverflowSlide = ({item}: OverflowSlideProps) => {

    const [inFavorite, setInFavorite] = useState(false)

    return (
      <Link key={item.link} href={item.link}>
        <a className={styles.slide}><img src={item.image}/>
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
          length={items.length}
          style='withoutLength'
          onPrev={() => slider.slickGoTo(currentIndex - 1)}
          onNext={() => slider.slickGoTo(currentIndex + 1)}
          slider />
      </div>
      <HiddenXs>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {items.map((item, index) =>
            <Slide item={item} key={index}/>
          )}
        </Slider>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.overflow}>
          {items.map((item, index) =>
            <Link key={item.link} href={item.link}>
              <a className={styles.slide}><img src={item.image}/>
                <div className={styles.label}>{item.label}</div>
              </a>
            </Link>
          )}
        </div>
      </VisibleXs>
    </div>
  )
}
