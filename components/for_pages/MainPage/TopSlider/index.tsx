import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import SlideSlider from './SlideSlider'
import Button from 'components/ui/Button'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import Gift from 'components/for_pages/Common/Gift'
import classNames from 'classnames'
import {Col, Row} from 'react-grid-system'
import {BonusDepositShowMode} from 'types/enums'
import Image from 'next/image'
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
        breakpoint: 1023,
        settings: {
          variableWidth: false,
          centerMode: true,
          centerPadding: '15px',
        }
      },
    ]
  }

  console.log('Banners', context.banners)

  return (
    <div className={styles.root}>
      {(context.showBonus && context.bonusShowMode === BonusDepositShowMode.Gift) && <div className={styles.bonus}><Gift timer/></div>}
      <HiddenXs>
        <Row>
          <Col>
        <div className={styles.desktop}>
          <div className={styles.col}>
          <BonusSlide style={'slide'}/>
          </div>
          <div className={styles.col}>
          <SlideSlider items={context.banners}/>
          </div>
        </div>
          </Col>
        </Row>
      </HiddenXs>
      <VisibleXs>
        <>
          <Slider {...settings}>
            <BonusSlide className={styles.bonusSlideMobile}/>
            {context.banners.map((item, index) => <div className={styles.rootSlide}>
                 <div className={styles.item} key={item.id}>
                   {(item.imageMobileUrl || item.imageDesktopUrl) && <Image src={item.imageMobileUrl || item.imageDesktopUrl} layout={'fill'}/>}

                   <div className={styles.left}>
                    <div className={classNames({[styles.label]: index == 0})}>
                      {item.title}
                    </div>
                    <div className={styles.btn}>
                      <Button size='normal' background='white'  href={item.redirectUrl}>{item.textButton}</Button>
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

