import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import {IGame} from 'data/interfaces/IGame'
import {Routes} from 'types/routes'
import FavoriteBtn from 'components/ui/FavoriteBtn'
import {useMeasure} from 'react-use'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import {useTranslation} from 'next-i18next'

interface IItem {
  image: string
  label: string
  link?: string
}

interface Props {
  item: IGame
  slider?: boolean
  link?: string
  richy?: boolean
  inSlider?: boolean
  onClickDemo?: () => void
  onClickPlay?: () => void
  onDeleteFromFavorite?: (item: IGame) => void
}

export default function ItemGame(props: Props) {
  const {t} = useTranslation()
  const [ref, { width }] = useMeasure()
  const context = useAppContext()
  const link = props.link || Routes.catalogGame(props.item.id)
  const handlePlayClick = (e) => {
    if(!context.auth){
      e.preventDefault()
      context.showModal(ModalType.login)
      return
    }
  }
  return (
    <div ref={ref} className={classNames(styles.root, {
      [styles.small]: width > 120 && width < 140,
      [styles.exSmall]: width <= 120
    })} style={!props.slider ? {backgroundImage: `url(${props.item.imageIconPreviewUrl})`} : null}>
    <div className={styles.shade}>
      <div className={styles.top}><FavoriteBtn id={props.item.id} inActiveClassName={styles.favoriteInActive} className={styles.favorite} onChange={(val) => !val &&  props.onDeleteFromFavorite ? props.onDeleteFromFavorite(props.item) : null}/></div>
      <div className={styles.btns}>
        <div className={styles.btnsWrapper}>
          <Button className={classNames(styles.btn)} href={link} onClick={handlePlayClick} size='small' background='blueGradient500'>{t('game_card_play')}</Button>
          <Button className={classNames(styles.btn, styles.demo)} href={`${link}?demo=1`} size='small' background='blackTransparent'>{t('game_card_demo')}</Button>
        </div>
        </div>
      <div className={classNames(styles.top, styles.bottom)}><FavoriteBtn id={props.item.id} inActiveClassName={styles.favoriteInActive} className={styles.favorite} /></div>

    </div>
      {props.slider && <img src={props.item.imageIconPreviewUrl} alt=''/>}
      {props.richy &&
      <div className={styles.label}>
        {props.item.name}
      </div>}
    </div>
  )
}
