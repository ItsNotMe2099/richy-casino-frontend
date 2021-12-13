import Slider from 'react-slick'
import Slide from './Slide'
import styles from './index.module.scss'
import { useState } from 'react'
import Header from '../Header'

interface Props {
  slider?: any
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

  return (
      <div className={styles.root}>
        <div className={styles.header}>
        <Header 
        icon='/img/Contents/gamepad.svg' 
        label='Richy Games' 
        length={items.length} 
        onPrev={() => slider.slickGoTo(currentIndex - 1)}
        onNext={() => slider.slickGoTo(currentIndex + 1)}
        games 
        slider />
        </div>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {items.map((item, index) => 
            <Slide item={item} key={index}/>
          )}
        </Slider>
        <div className={styles.overflowSlider}>
          {items.map((item, index) => 
            <Slide item={item} key={index}/>
          )}
        </div>
      </div>
  )
}
