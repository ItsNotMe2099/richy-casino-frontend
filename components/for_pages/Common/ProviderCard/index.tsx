import styles from './index.module.scss'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import Link from 'next/link'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface Props {
  item: IGameProvider
  onClick?: () => void,

}

export default function ProviderCard(props: Props) {
  const appContext = useAppContext()
  const link = Routes.catalogProvider(props.item.id)
  const active = useIsActiveLink(link)
  return (
    <Link href={link} scroll={!appContext.isMobile}>
    <a className={classNames(styles.root, {[styles.active]: active})} onClick={props.onClick}>
      <div className={styles.icon}>
        {props.item.imagePreviewUrl && <img alt={props.item.name} src={props.item.imagePreviewUrl}/>}

       </div>
      <div className={styles.name}>{props.item.name}</div>
      <div className={styles.quantity}>
        {props.item.gamesAmount}
      </div>
    </a>
    </Link>
  )
}
