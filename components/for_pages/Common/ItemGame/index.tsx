import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { IGame } from 'data/interfaces/IGame'
import { Routes } from 'types/routes'
import FavoriteBtn from 'components/ui/FavoriteBtn'
import { useMeasure } from 'react-use'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface IItem {
  image: string
  label: string
  link?: string
}

interface Props {
  item: IGame
  className?: string
  slider?: boolean
  link?: string
  richy?: boolean
  inSlider?: boolean
  onClickDemo?: () => void
  onClickPlay?: () => void
  onDeleteFromFavorite?: (item: IGame) => void
}

export default function ItemGame(props: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const [ref, { width }] = useMeasure()
  const context = useAppContext()
  const link = props.link || Routes.catalogGame(props.item.id)
  const handlePlayClick = (e) => {
    if (!context.auth) {
      e.preventDefault()
      context.showModal(ModalType.login)
      return
    }
    if (props.onClickPlay) {
      props.onClickPlay()
    }
  }
  const handleDemoClick = (e) => {
    if (props.onClickDemo) {
      props.onClickDemo()
    }
  }
  return (
    <div ref={ref} className={classNames(styles.root, {
      [styles.small]: width > 120 && width < 140,
      [styles.exSmall]: width <= 120
    }, props.className)}>
      {props.item.imageIconPreviewUrl && <Image src={props.item.imageIconPreviewUrl} priority layout={'fill'} alt={props.item.name} />}
      <div className={styles.shade}>
        <div className={styles.top}><div className={styles.providerName}>{props.item.providerName}</div></div>
        <div className={styles.btns}>
          {!props.item.isBlackListed && <div className={styles.btnsWrapper}>
            <Button className={classNames(styles.btn)} href={link} onClick={handlePlayClick} size='small' background='blueGradient500'>{t('game_card_play')}</Button>
            <Button className={classNames(styles.btn, styles.demo, {[styles.hidden]: !props.item.isDemoEnable})}  href={`${link}?demo=1`} onClick={handleDemoClick} size='small' background='blackTransparent'>{t('game_card_demo')}</Button>
          </div>}
          {props.item.isBlackListed && <div className={styles.blackListed}>Игра не доступна в вашем регионе</div>}
        </div>
        <div className={classNames(styles.top, styles.bottom)}><FavoriteBtn id={props.item.id} inActiveClassName={styles.favoriteInActive} className={styles.favorite} /></div>

      </div>
      {props.richy &&
        <div className={styles.label}>
          {props.item.name}
        </div>}
    </div>
  )
}
