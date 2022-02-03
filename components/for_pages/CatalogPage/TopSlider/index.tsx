import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Slider from 'react-slick'
import { Col } from 'react-grid-system'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

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
          variableWidth: true,
          centerMode: true
        }
      },
    ]
  }


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
      <BonusSlide className={styles.desktop}/>
      </>
      </HiddenXs>
      <VisibleXs>
      <Slider {...settings}>
        <BonusSlide/>
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

