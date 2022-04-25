import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'

interface IUser {
  id: string
  balance: string
}

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
}

export default function ProfileModalBody(props: Props) {
  const context = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed || context.isMobile})}>
      {props.children}
    </div>
    )
}
