import Slider from 'react-slick'
import Slide from './Slide'
import styles from './index.module.scss'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  slider?: any
}

const SliderArrow = () => {
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.916595 11.5417C0.73162 11.542 0.552359 11.4776 0.409928 11.3596C0.329765 11.2931 0.263501 11.2115 0.214931 11.1194C0.166361 11.0273 0.136439 10.9265 0.126879 10.8228C0.117319 10.7191 0.128309 10.6146 0.159219 10.5151C0.190129 10.4157 0.240352 10.3233 0.307011 10.2433L3.85368 5.99999L0.433679 1.74874C0.367918 1.66777 0.31881 1.57459 0.289176 1.47457C0.259543 1.37455 0.249969 1.26966 0.261004 1.16593C0.272039 1.0622 0.303466 0.961674 0.353478 0.870129C0.403491 0.778583 0.471103 0.697824 0.552428 0.632494C0.634339 0.560423 0.730262 0.506061 0.834178 0.47282C0.938094 0.439579 1.04776 0.428176 1.15629 0.439326C1.26482 0.450477 1.36988 0.48394 1.46486 0.537617C1.55985 0.591293 1.64272 0.664024 1.70826 0.751244L5.53201 5.50124C5.64845 5.6429 5.7121 5.82058 5.7121 6.00395C5.7121 6.18732 5.64845 6.365 5.53201 6.50666L1.57368 11.2567C1.49426 11.3525 1.39338 11.4282 1.27921 11.4777C1.16504 11.5272 1.04081 11.5491 0.916595 11.5417Z" fill="white"/>
    </svg>
  )
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
    beforeChange: (current, next) => setCurrentIndex(next),
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
          <div className={styles.block}>
          <div className={styles.gamepad}>
            <img src='/img/Contents/gamepad.svg' alt=''/>
          </div>
          <div className={styles.games}>
            Richy Games
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.length}>
            {items.length}
          </div>
          <Link href='#'>
          <a className={styles.all}>
            Все <span>игры</span>
          </a>
          </Link>
          <div className={styles.controls}>
            <div className={styles.prev} onClick={() => slider.slickGoTo(currentIndex - 1)}>
              <SliderArrow/>
            </div>
            <div className={styles.next} onClick={() => slider.slickGoTo(currentIndex + 1)}>
              <SliderArrow/>
            </div>
          </div>
        </div>
        </div>
        <Slider {...settings} ref={slider1 => (slider = slider1)}>
          {items.map(item => 
            <Slide item={item}/>
          )}
        </Slider>
        <div className={styles.overflowSlider}>
          {items.map(item => 
            <Slide item={item}/>
          )}
        </div>
      </div>
  )
}
