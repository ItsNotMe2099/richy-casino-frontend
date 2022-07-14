import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {Routes} from 'types/routes'
import { useRouter} from 'next/router'
import {ReactElement} from 'react'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'


interface Props {
  label: string | ReactElement
  link: string
  onClick?: () => void
  className?: string

}

export default function MenuItem(props: Props) {
    const { asPath } = useRouter()
    const appContext = useAppContext()
    const router = useRouter()
  const key = asPath.replace('/', '')
  let active = useIsActiveLink(props.link)
  if( Routes.catalog === props.link && key && [Routes.catalogLive, Routes.richyGames].map(i => i.replace('/', '')).includes(key)){
    active = false
  }
  const handleClick = (e) => {
    if(props.link === Routes.poker){
      if (appContext.auth) {
        router.push(Routes.poker)
      } else {
        e.stopPropagation()
        e.preventDefault()
        appContext.showModal(ModalType.registration)
      }
    }else if(props.link === Routes.chess){
      if (appContext.auth) {
        router.push(Routes.chess)
      } else {
        e.stopPropagation()
        e.preventDefault()
        appContext.showModal(ModalType.registration)
      }
    }
    if(props.onClick){
      e.preventDefault()
      props.onClick()
    }
  }
    return(
      <Link href={props.link}>
          <a
            className={classNames(styles.root, props.className, {
            [styles.active]: active,
            })}
            href={props.link}
            onClick={handleClick}
          >
            {props.label}
          </a>
      </Link>
    )
  }
