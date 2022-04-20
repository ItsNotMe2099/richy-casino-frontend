import styles from './index.module.scss'
import { useState } from 'react'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import {IGame} from 'data/interfaces/IGame'
import {Routes} from 'types/routes'

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
}

export default function ItemGame(props: Props) {

  const [inFavorite, setInFavorite] = useState(false)
  const link = props.link || Routes.catalogGame(props.item.id)
  return (
    <div className={classNames(styles.root)} style={!props.slider ? {backgroundImage: `url(${props.item.imageIconPreviewUrl})`} : null}>
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
          <Button className={styles.btn} href={link} size='small' background='blueGradient500'>Играть</Button>
          <Button className={styles.demo} href={`${link}?demo=1`} size='small' background='blackTransparent'>Демо</Button>
        </div>
      </div>
      </div>
      {props.slider && <img src={props.item.imageIconPreviewUrl} alt=''/>}
      {props.richy &&
      <div className={styles.label}>
        {props.item.name}
      </div>}
    </div>
  )
}
