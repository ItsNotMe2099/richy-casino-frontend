import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {  useState } from 'react'
import Slider from 'react-slick'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import {IBanner} from 'data/interfaces/IBanner'
import Image from 'next/image'
import { useMeasure } from 'react-use'


interface Props {
  className?: string
  slider?: any
  items: IBanner[]
  style?: 'catalog'
}

export default function SlideSlider(props: Props) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const context = useAppContext()

  const [ref, { width, height }] = useMeasure()

  const user = context.auth

  let { slider } = props

  const settings = {
    className: `${styles.slider}`,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    dotsClass: `${styles.dots}`,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: false
        }
      },
    ]
  }

  const SliderArrow = () => {
    const svgWidth = `${width / 15}px`
    const svgHeight = `${height / 15}px`
    return (
      <svg width={svgWidth} height={svgHeight} viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.916595 11.5417C0.73162 11.542 0.552359 11.4776 0.409928 11.3596C0.329765 11.2931 0.263501 11.2115 0.214931 11.1194C0.166361 11.0273 0.136439 10.9265 0.126879 10.8228C0.117319 10.7191 0.128309 10.6146 0.159219 10.5151C0.190129 10.4157 0.240352 10.3233 0.307011 10.2433L3.85368 5.99999L0.433679 1.74874C0.367918 1.66777 0.31881 1.57459 0.289176 1.47457C0.259543 1.37455 0.249969 1.26966 0.261004 1.16593C0.272039 1.0622 0.303466 0.961674 0.353478 0.870129C0.403491 0.778583 0.471103 0.697824 0.552428 0.632494C0.634339 0.560423 0.730262 0.506061 0.834178 0.47282C0.938094 0.439579 1.04776 0.428176 1.15629 0.439326C1.26482 0.450477 1.36988 0.48394 1.46486 0.537617C1.55985 0.591293 1.64272 0.664024 1.70826 0.751244L5.53201 5.50124C5.64845 5.6429 5.7121 5.82058 5.7121 6.00395C5.7121 6.18732 5.64845 6.365 5.53201 6.50666L1.57368 11.2567C1.49426 11.3525 1.39338 11.4282 1.27921 11.4777C1.16504 11.5272 1.04081 11.5491 0.916595 11.5417Z" fill="white"/>
      </svg>
    )
  }

  const rootClass = {
    [styles.catalog]: props.style === 'catalog' && currentIndex === 0
  }

  return (
      <div ref={ref} className={classNames(styles.root, rootClass)}>
      <div className={styles.controls}>
        <div className={styles.prev} onClick={() => slider.slickGoTo(currentIndex - 1)} style={{width: `${width / 10}px`, height: `${height / 4}px`}}>
          <SliderArrow/>
        </div>
        <div className={styles.next} onClick={() => slider.slickGoTo(currentIndex + 1)} style={{width: `${width / 10}px`, height: `${height / 4}px`}}>
          <SliderArrow/>
        </div>
      </div>
      <Slider {...settings} ref={slider1 => (slider = slider1)}>
        {props.items.map((item, index) =>

        <div key={index} className={styles.item}>
          {(item.imageDesktopUrl || item.imageMobileUrl) && <Image src={item.imageDesktopUrl || item.imageMobileUrl} layout={'fill'}/>}

          <div className={styles.left}>
          <div className={classNames(styles.label, {[styles.second]: index > 0})} style={{fontSize: `${width / 24}px`}}>
            {item.title}
          </div>
          <div className={classNames(styles.btn, {[styles.alt]: index === 1})} style={{fontSize: `${width / 24}px`}}>
            <Button size='normal' background={index === 1 ? 'blueGradient500' : 'white'} href={item.redirectUrl}>{item.textButton}</Button>
          </div>
        </div>
        </div>

        )}
      </Slider>
      </div>
  )
}

