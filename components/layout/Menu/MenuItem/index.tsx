import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {Routes} from 'types/routes'
import {useRouter} from 'next/router'
import {ReactElement} from 'react'


interface Props {
  label: string | ReactElement
  link: string
  onClick?: () => void
  className?: string

}

export default function MenuItem(props: Props) {
    const { asPath } = useRouter()
  const key = asPath.replace('/', '')
  let active = useIsActiveLink(props.link)
  if( Routes.catalog === props.link && key && [Routes.catalogLive, Routes.richyGames].map(i => i.replace('/', '')).includes(key)){
    active = false
  }
  const handleClick = (e) => {
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
