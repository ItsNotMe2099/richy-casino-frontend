import styles from './index.module.scss'
import { IGameProviderTop3} from 'data/interfaces/IGameProvider'
import Link from 'next/link'
import {Routes} from 'types/routes'
import useIsActiveLink from 'hooks/useIsActiveLink'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import ItemGame from 'components/for_pages/Common/ItemGame'

interface Props {
  item: IGameProviderTop3
  onClick?: () => void,

}

export default function ProviderMainCard(props: Props) {
  const appContext = useAppContext()
  const link = Routes.catalogProvider(props.item.id)
  const active = useIsActiveLink(link)
  return (
    <Link href={link} scroll={!appContext.isMobile}>
    <a className={classNames(styles.root, {[styles.active]: active})} onClick={props.onClick}>
      <div className={styles.icon}>
        {props.item.imagePreviewUrl && <img alt={props.item.name} src={props.item.imagePreviewUrl}/>}

       </div>
      {!props.item.imagePreviewUrl && <div className={styles.name}>{props.item.name}</div>}
      {!appContext.isMobile && <div className={styles.games}>
        {props.item.games.map(i => <ItemGame key={i.id} item={i}/>)}
      </div>}
    </a>
    </Link>
  )
}
