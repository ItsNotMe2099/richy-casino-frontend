import styles from './index.module.scss'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import Link from 'next/link'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import classNames from 'classnames'

interface Props {
  item: IGameProvider
  onClick?: () => void,

}

export default function ProviderCard(props: Props) {
  const link = Routes.catalogProvider(props.item.id)
  const active = useIsActiveLink(link)
  return (
    <Link href={link}>
    <a className={classNames(styles.root, {[styles.active]: active})} onClick={props.onClick}>
      <div className={styles.icon}>
        {props.item.imagePreviewUrl ? <img src={props.item.imagePreviewUrl}/> : props.item.name}
      </div>
      <div className={styles.quantity}>
        {props.item.gamesAmount}
      </div>
    </a>
    </Link>
  )
}