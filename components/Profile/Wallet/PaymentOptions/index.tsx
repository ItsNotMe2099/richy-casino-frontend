import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {ReactElement} from 'react'
import classNames from 'classnames'

interface Props {
  isOpen?: boolean
}

interface Props {
  children?: ReactElement | ReactElement[]
}

export const PaymentOptions = (props: Props) => {
  const {t} = useTranslation()
  const childrenLength = Array.isArray(props.children) ? props.children.length : 1
  return (
    <div className={classNames(styles.root, {[styles.one]: childrenLength === 1, [styles.two]: childrenLength === 2})}>
      {props.children}
    </div>
  )
}
