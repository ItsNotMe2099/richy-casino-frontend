import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {ReactElement} from 'react'

interface Props {
  isOpen?: boolean
}

interface Props {
  children?: ReactElement | ReactElement[] | any[]
}

export const PaymentMethodList = (props: Props) => {
  const {t} = useTranslation()

  return (
    <div className={styles.root}>
      {props.children}
    </div>
  )
}
