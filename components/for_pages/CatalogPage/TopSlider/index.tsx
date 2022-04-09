import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Slider from 'react-slick'
import { Col } from 'react-grid-system'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import SlideSlider from 'components/for_pages/MainPage/TopSlider/SlideSlider'

interface Props {
  children?: React.ReactNode
  className?: string
  money: string
}

export default function TopSlider(props: Props) {

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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          dots: false,
          centerMode: true,
          centerPadding: '15px',
        }
      },
    ]
  }

  const items =[
    {child: <BonusSlide/>, image: null},
    {label: <div>Лучшие игры<br/> от Richy</div>, image: '/img/TopSlider/banner@3x.png'},
    {label: <div className={styles.itemLabel}>Spin the <span className={styles.spin}>wheel of fortune</span><br/> every day and get a<br/> guaranteed <span className={styles.spin}>prizes</span></div>, image: '/img/TopSlider/wheel@3x.png'},
    {label: <div className={styles.itemLabel}>Try your luck in the <span className={styles.lottery}>most profitable</span><br/> cryptocurrency lottery<br/> and get bonuses</div>, image: '/img/TopSlider/lottery@3x.png'},
  ]


  return (
    <>
      <HiddenXs>
        <>
          <Col className={styles.root}>
            <div className={styles.jackpot}>
              <div className={styles.title}>JACKPOT</div>
              <div className={styles.money}>
                {props.money}
              </div>
            </div>
          </Col>
          <Col className={styles.desktop}>
          <SlideSlider items={items} style='catalog'/>
          </Col>
        </>
      </HiddenXs>
      <VisibleXs>
        <Slider {...settings}>
          <BonusSlide className={styles.bonusSlideMobile}/>
          <div className={styles.jackpot}>
            <div className={styles.title}>JACKPOT</div>
            <div className={styles.money}>
              {props.money}
            </div>
          </div>
        </Slider>
      </VisibleXs>
    </>
  )
}

