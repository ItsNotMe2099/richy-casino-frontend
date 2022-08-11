import styles from './index.module.scss'
import { IGame } from 'data/interfaces/IGame'
import ItemGame from 'components/for_pages/Common/ItemGame'
import FavoriteBtn from 'components/ui/FavoriteBtn'
import {useMeasure} from 'react-use'
import classNames from 'classnames'

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

export default function GameCard(props: Props) {
  const [ref, { width }] = useMeasure()
  return (
    <div  ref={ref} className={classNames(styles.root, {
      [styles.small]: width > 120 && width < 140,
      [styles.exSmall]: width <= 120
    })}>
      <div className={styles.image}>
        <ItemGame item={props.item}/>
      </div>
      <div className={styles.bottom}>
        <div className={styles.name}>
          {props.item.name}
        </div>
        <div className={styles.favoriteWrapper}>
        <FavoriteBtn id={props.item.id} inActiveClassName={styles.favoriteInActive} className={styles.favorite} onChange={(val) => !val && props.onDeleteFromFavorite ? props.onDeleteFromFavorite(props.item) : null} />
        </div>
      </div>
    </div>
  )
}
