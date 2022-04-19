import styles from './index.module.scss'
import Link from 'next/link'
import {Routes} from 'types/routes'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import useIsActiveLink from 'hooks/useIsActiveLink'
import classNames from 'classnames'

interface Props {
  item: IGameCategory
  onClick?: () => void,
}

export default function GameCategoryCard(props: Props) {
  const link = Routes.catalogCategory(props.item.id)
  const active = useIsActiveLink(link)
  return (
    <Link href={link}>
      <a className={classNames(styles.root, {[styles.active]: active})} onClick={props.onClick}>
        <div className={styles.icon}><img src={props.item.imageIconUrl} alt=''/></div>
        <div className={styles.label}>{props.item.name}</div>
        <div className={styles.quantity}>
          {props.item.gamesAmount}
        </div>
      </a>
    </Link>
  )
}
