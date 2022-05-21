import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import SlideSlider from 'components/for_pages/MainPage/TopSlider/SlideSlider'
import {useAppContext} from 'context/state'
import { useMeasure } from 'react-use'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Image from 'next/image'

interface Props {
  children?: React.ReactNode
  className?: string
  money: string
}

export default function TopSlider(props: Props) {
  const appContext = useAppContext()
  const [ref, { width, height }] = useMeasure()
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




  return (
    <div className={styles.root} ref={ref}>
      <HiddenXs>
        <>
            <div className={styles.wrapper}>
          <div className={styles.rootJack}>
            <div className={styles.jackpot}>
              <div className={styles.content}>
              <div className={styles.title} style={{fontSize: `${width / 27}px`}}>JACKPOT</div>
              <div className={styles.money} style={{fontSize: `${width / 18.5}px`}}>
                {props.money}
              </div>
            </div>
            </div>
          </div>
          <div className={styles.desktop}>
          <SlideSlider items={appContext.banners} style='catalog'/>
          </div>
            </div>
        </>
      </HiddenXs>
      <VisibleXs>
        <Slider {...settings}>
        <div className={styles.rootJack}>
            <div className={styles.jackpot}>
              <div className={styles.content}>
              <div className={styles.title} style={{fontSize: `${width / 10}px`}}>JACKPOT</div>
              <div className={styles.money} style={{fontSize: `${width / 8.5}px`}}>
                {props.money}
              </div>
            </div>
            </div>
          </div>
          <BonusSlide className={styles.bonusSlideMobile}/>
            {appContext.banners.map((item, index) => <div className={styles.rootSlide} key={index}>
                 <div className={styles.item} key={item.id}>
                   {(item.imageMobileUrl || item.imageDesktopUrl) && <Image src={item.imageMobileUrl || item.imageDesktopUrl} layout={'fill'}/>}

                   <div className={styles.left}>
                    <div className={styles.label} style={{fontSize: `${width / 24}px`}}>
                      {item.title}
                    </div>
                    <div className={classNames(styles.btn, {[styles.alt]: index === 1})} style={{fontSize: `${width / 25}px`}}>
                      <Button size='normal' background={index === 1 ? 'blueGradient500' : 'white'}  href={item.redirectUrl}>{item.textButton}</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </Slider>
      </VisibleXs>
    </div>
  )
}

