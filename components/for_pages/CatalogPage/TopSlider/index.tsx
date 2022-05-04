import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Slider from 'react-slick'
import { Col } from 'react-grid-system'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import SlideSlider from 'components/for_pages/MainPage/TopSlider/SlideSlider'
import classNames from 'classnames'
import Button from 'components/ui/Button'

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
    {label: <div className={styles.best}>Лучшие игры<br/> от Richy</div>, image: '/img/TopSlider/banner@3x.png'},
    {label: <div className={styles.itemLabel}>Spin the <span className={styles.spin}>wheel of fortune</span><br/> every day and get a<br/> guaranteed <span className={styles.spin}>prizes</span></div>, image: '/img/TopSlider/wheel@3x.png'},
    {label: <div className={styles.itemLabel}>Try your luck in the <span className={styles.lottery}>most profitable</span><br/> cryptocurrency lottery<br/> and get bonuses</div>, image: '/img/TopSlider/lottery@3x.png'},
  ]




  return (
    <>
      <HiddenXs>
        <>
          <Col>
            <div className={styles.wrapper}>
          <div className={styles.root}>
            <div className={styles.jackpot}>
              <div className={styles.title}>JACKPOT</div>
              <div className={styles.money}>
                {props.money}
              </div>
            </div>
          </div>
          <div className={styles.desktop}>
          <SlideSlider items={items} style='catalog'/>
          </div>
            </div>
          </Col>
        </>
      </HiddenXs>
      <VisibleXs>
        <Slider {...settings}>
        <div className={styles.jackpot}>
            <div className={styles.title}>JACKPOT</div>
            <div className={styles.money}>
              {props.money}
            </div>
          </div>
          <BonusSlide className={styles.bonusSlideMobile}/>
          {items.slice(1).map((item, index) =>
              <div className={styles.rootSlide} key={index}>
                <div className={styles.item} style={{backgroundImage: `url(${item.image})`}}>
                  <div className={styles.left}>
                    <div className={classNames({[styles.label]: index == 0})}>
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
      </VisibleXs>
    </>
  )
}

