import styles from './index.module.scss'
import {Col, Row} from 'react-grid-system'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import SlideSlider from './SlideSlider'
import Button from 'components/ui/Button'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import Gift from 'components/for_pages/Common/Gift'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function TopSlider(props: Props) {

  const context = useAppContext()

  const user = context.auth

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
        breakpoint: 428,
        settings: {
          variableWidth: false,
          centerMode: true,
          centerPadding: '15px',
        }
      },
    ]
  }

  const items =[
    {label: 'Лучшие игры на Richy', image: '/img/TopSlider/banner.png'},
    {label: 'Spin the wheel of fortune every day and get a guaranteed prizes', image: '/img/TopSlider/wheel.png'},
    {label: 'Try your luck in the most profitable cryptocurrency lottery and get bonuses ', image: '/img/TopSlider/lottery.png'},
  ]


  return (
    <div className={styles.root}>
      {(context.showBonus && !context.showBonusExpanded) && <div className={styles.bonus}><Gift timer/></div>}
      <HiddenXs>

        <Row className={styles.desktop}>
          <Col className={styles.col}>
          <BonusSlide/>
          </Col>
          <SlideSlider items={items}/>
        </Row>
      </HiddenXs>
      <VisibleXs>
        <>
          <Slider {...settings}>
            <BonusSlide className={styles.bonusSlideMobile}/>
            {items.map((item, index) =>
              <div className={styles.rootSlide} key={index}>
                <div className={styles.item} style={{backgroundImage: `url(${item.image})`}}>
                  <div className={styles.left}>
                    <div className={classNames(styles.label, {[styles.otherLabel]: index !== 0})}>
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

