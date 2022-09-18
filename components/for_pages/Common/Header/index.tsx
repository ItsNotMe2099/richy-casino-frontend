import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import QuestionPopover from 'components/ui/QuestionPopover'
import Link from 'next/link'
import VisibleXs from 'components/ui/VisibleXS'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import {useAppContext} from 'context/state'
import SliderArrowSvg from 'components/svg/SliderArrowSvg'

interface Props {
  length?: number | string
  icon?: string
  label: string
  onPrev?: () => void
  onNext?: () => void
  slider?: boolean
  popoverText?: string
  style?: 'labelOnly' | 'withoutLength' | 'fullOnlyOnMobile' | 'popover' | null
  shadowColor?: 'red' | 'blue' | 'yellow' | 'violet'
  className?: string
  allLink?: string
  iconClassName?: string
}

export default function Header(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const isMobile = context.isMobile


  const getShadow = (shadowColor) => {
    switch (shadowColor) {
      case 'blue':
        return '/img/shadows/light-blue.png'
      case 'red':
        return '/img/shadows/light-red.png'
      case 'yellow':
        return '/img/shadows/light-yellow.png'
      case 'violet':
        return '/img/shadows/light-violet.png'
    }
  }

  const rootClasses = {
    [styles.labelOnly]: props.style === 'labelOnly',
    [styles.withoutLength]: props.style === 'withoutLength',
    [styles.fullOnlyOnMobile]: props.style === 'fullOnlyOnMobile',
    [styles.popover]: props.style === 'popover',
  }
  const block = (<div className={styles.blockInner}>
    {props.icon && <div className={styles.icon}>
      {props.shadowColor && <div className={styles.shadow}>
        <Image src={getShadow(props.shadowColor)} width={isMobile ? 30 : 84} height={isMobile ? 30 : 84}/>
      </div>}
      <div className={classNames(styles.image, props.iconClassName)}><img src={props.icon} alt=''/></div>
    </div>}
    <div className={styles.label}>
      {props.label}
    </div>
  </div>)
  return (
    <div className={classNames(styles.root, rootClasses, props.className)}>
      <div className={styles.block}>
        {props.allLink && <Link href={props.allLink}>
          <a >
            {block}
          </a>
        </Link>}
        {!props.allLink && block}
      </div>


      <div className={styles.right}>
        <QuestionPopover info={props.popoverText} className={styles.question}/>
        <div className={styles.length}>
          {props.length}
        </div>
        {props.allLink && <Link href={props.allLink}>
          <a className={styles.all}>
            <VisibleXs>{t('catalog_header_all')}</VisibleXs>
            <HiddenXs>{t('catalog_header_all_games')}</HiddenXs>
          </a>
        </Link>}

        {props.slider &&
          <div className={styles.controls}>
            <div className={styles.prev} onClick={props.onPrev}>
              <SliderArrowSvg/>
            </div>
            <div className={styles.next} onClick={props.onNext}>
              <SliderArrowSvg/>
            </div>
          </div>}
      </div>
    </div>
  )
}
