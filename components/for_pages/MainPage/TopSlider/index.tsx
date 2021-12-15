import styles from './index.module.scss'
import { Row } from 'react-grid-system'
import ConstantSlide from 'components/for_pages/Common/ConstantSlide'
import SlideSlider from './SlideSlider'
import Button from 'components/ui/Button'
import Slider from 'react-slick'
import { useState } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function TopSlider(props: Props) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  }

  const items =[
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/banner.svg'},
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/banner.svg'},
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/d.jpg'},
  ]

  return (
    <div className={styles.root}>
      <Row className={styles.desktop}>
        <ConstantSlide/>
        <SlideSlider items={items}/>
      </Row>
      <Slider {...settings}>
        <ConstantSlide/>
        {items.map((item, index) =>
        <div className={styles.rootSlide}>
        <div key={index} className={styles.item} style={{backgroundImage: `url(${items[currentIndex].image})`}}>
        <div className={styles.left}>
          <div className={styles.label}>
            {item.label}
          </div>
          <div className={styles.btn}>
            <Button size='normal' background='white'>Начать играть</Button>
          </div>
        </div>
        </div>  
        </div> 
        )}
      </Slider>
    </div>
  )
}

