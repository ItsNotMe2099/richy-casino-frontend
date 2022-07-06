import styles from './index.module.scss'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import SlideSlider from './SlideSlider'
import Button from 'components/ui/Button'
import Slider from 'react-slick'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
//import Gift from 'components/for_pages/Common/Gift'
import classNames from 'classnames'
//import {BonusDepositShowMode} from 'types/enums'
import Image from 'next/image'
import { useMeasure } from 'react-use'
interface Props {
  children?: React.ReactNode
  className?: string
}

export default function TopSlider(props: Props) {

  const context = useAppContext()

  const user = context.auth

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

    <div className={styles.root} ref={ref}>
      {/*(context.showBonus && context.bonusShowMode === BonusDepositShowMode.Gift) && <div className={styles.bonus}><Gift timer/></div>*/}
      <HiddenXs>
        <div className={styles.desktop}>
          <BonusSlide style={'slide'}/>
          <SlideSlider items={context.banners}/>
        </div>
      </HiddenXs>
      <VisibleXs>
        <>
          <Slider {...settings}>
            <BonusSlide className={styles.bonusSlideMobile}/>
            {context.banners.map((item, index) => <div className={styles.rootSlide} key={index}>
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
        </>
      </VisibleXs>
    </div>
  )
}

