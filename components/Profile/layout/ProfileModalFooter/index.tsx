import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  className?: string
  detectKeyboard?: boolean
}

export default function ProfileModalFooter(props: Props) {
  const appContext = useAppContext()

  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed}, props.className)}>
      {props.children}
    </div>
    )
}
