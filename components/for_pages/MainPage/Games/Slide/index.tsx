import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Button from 'components/ui/Button'
import classNames from 'classnames'

interface IItem {
  image: string
  label: string
  link: string
}

interface Props {
  item: IItem
}

export default function Slide(props: Props) {

  const [inFavorite, setInFavorite] = useState(false)

  return (
    <Link href={props.item.link}>
    <a className={styles.root} style={{backgroundImage: `url(${props.item.image})`}}>
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
          <Button className={styles.btn} size='small' background='blueGradient500'>Играть</Button>
          <Button className={styles.demo} size='small' background='blackTransparent'>Демо</Button>
        </div>
        </div>
        </div>
      <div className={styles.label}>
        {props.item.label}
      </div>
    </a>
  </Link>
  )
}
