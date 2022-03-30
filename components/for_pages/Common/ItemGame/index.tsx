import styles from './index.module.scss'
import { useState } from 'react'
import Button from 'components/ui/Button'
import classNames from 'classnames'

interface IItem {
  image: string
  label: string
  link?: string
}

interface Props {
  item: IItem
  style?: 'catalog'
  richy?: boolean
}

export default function ItemGame(props: Props) {

  const [inFavorite, setInFavorite] = useState(false)

  const rootClass = {
    [styles.catalog]: props.style === 'catalog'
  }

  return (
    <div className={classNames(styles.root, rootClass)} style={props.style !== 'catalog' ? {backgroundImage: `url(${props.item.image})`} : null}>
    <div className={styles.shade}>
    <Button
          onClick={() => inFavorite ? setInFavorite(false) : setInFavorite(true)}
          className={classNames(styles.favorite, {[styles.active]: inFavorite})}
          size='superExtraSmall'
          background='blackTransparent'>
          {inFavorite ?
            <img src='/img/GamesList/star-fill.svg' alt=''/>
            :
            <img src='/img/GamesList/star-stroke.svg' alt=''/>}
        </Button>
      <div className={styles.container}>
        <div className={styles.btns}>
          <Button className={styles.btn} href={props.item.link} size='small' background='blueGradient500'>Играть</Button>
          <Button className={styles.demo} size='small' background='blackTransparent'>Демо</Button>
        </div>
      </div>
      </div>
      {props.style === 'catalog' && <img src={props.item.image} alt=''/>}
      {props.richy &&
      <div className={styles.label}>
        {props.item.label}
      </div>}
    </div>
  )
}
