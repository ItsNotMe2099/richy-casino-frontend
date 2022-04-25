import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
}

export default function ProfileModalFooter(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed})}>
      {props.children}
    </div>
    )
}
