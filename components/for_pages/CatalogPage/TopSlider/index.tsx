import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Slider from 'react-slick'
import { Col } from 'react-grid-system'

interface Props {
  children?: React.ReactNode
  className?: string
  money: string
  slider?: boolean
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
  }


  return (
    <>
    {!props.slider ?
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
      :
      null
      }
      {props.slider &&
      <Slider {...settings}>
        <BonusSlide className={styles.const}/>
        <div className={styles.jackpot}>
          <div className={styles.title}>JACKPOT</div>
          <div className={styles.money}>
            {props.money}
          </div>
        </div>
      </Slider>}
      </>
  )
}

