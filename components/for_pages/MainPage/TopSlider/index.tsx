import styles from './index.module.scss'
import { Row } from 'react-grid-system'
import ConstantSlide from 'components/for_pages/Common/ConstantSlide'
import SlideSlider from './SlideSlider'
import Button from 'components/ui/Button'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import Gift from 'components/for_pages/Common/Gift'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function TopSlider(props: Props) {

  const context = useAppContext()

  const user = true//context.auth

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    dotsClass: `${styles.dots}`,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
          dots: true,
          centerMode: true
        }
      },
    ]
  }

  const items =[
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/banner.png'},
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/banner.png'},
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/d.jpg'},
  ]


  return (
    <div className={styles.root}>
      <HiddenXs>
      <Row className={styles.desktop}>
        <ConstantSlide/>
        <SlideSlider items={items}/>
      </Row>
      </HiddenXs>
      <VisibleXs>
      <>
      {(context.showBonus && !context.showBonusExpanded) && <div className={styles.bonus}><Gift timer/></div>}
      <Slider {...settings}>
        <ConstantSlide/>
        {items.map((item, index) =>
        <div className={styles.rootSlide} key={index}>
        <div className={styles.item} style={{backgroundImage: `url(${item.image})`}}>
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
      </>
      </VisibleXs>
    </div>
  )
}

