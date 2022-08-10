import styles from './index.module.scss'
import Link from 'next/link'
import {Routes} from 'types/routes'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import useIsActiveLink from 'hooks/useIsActiveLink'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import { useAppContext } from 'context/state'
import {RICHY_CATEGORY_NAME} from '../../../../types/constants'

interface Props {
  item: IGameCategory
  onClick?: () => void,
}

export default function GameCategoryCard(props: Props) {
  const appContext = useAppContext()
  const link = props.item.internalName.toLowerCase() === RICHY_CATEGORY_NAME ? Routes.richyGames : Routes.catalogCategory(props.item.id)
  const active = useIsActiveLink(link)
  return (
    <Link href={link} scroll={!appContext.isMobile}>
      <a className={classNames(styles.root, {[styles.active]: active})} onClick={props.onClick}>
        <div className={styles.icon}><img src={props.item.imageIconUrl} alt=''/></div>
        <div className={styles.label}>{props.item.name}</div>
        <div className={styles.quantity}>
          {Formatter.formatNumber(props.item.gamesAmount)}
        </div>
      </a>
    </Link>
  )
}
