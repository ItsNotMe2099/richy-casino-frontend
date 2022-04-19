import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'

interface IOption{
  label: string
  link: string
}

interface Props {
  label: string
  link: string

}

export default function MenuItem(props: Props) {
  const active = useIsActiveLink(props.link)
    return(
      <Link href={props.link}>
          <a
            className={classNames(styles.root, {
            [styles.active]: active,
            })}
            href={props.link}
          >
            {props.label}
          </a>
      </Link>
    )
  }
