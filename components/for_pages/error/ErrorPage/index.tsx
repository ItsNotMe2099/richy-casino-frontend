import styles from './index.module.scss'

import {ReactElement} from 'react'
import Logo from 'components/svg/Logo'

interface Props {
  title?: string
  children?: ReactElement | ReactElement[]
}

export default function ErrorPage(props: Props) {
  return (
    <div className={styles.root}>
      <Logo/>
      <div className={styles.title}>{props.title}</div>
      {props.children && <div className={styles.body}>{props.children}</div>}
    </div>
  )
}
