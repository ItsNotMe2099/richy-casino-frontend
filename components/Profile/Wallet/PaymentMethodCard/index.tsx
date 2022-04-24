import styles from './index.module.scss'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'
import {forwardRef, ReactElement} from 'react'

interface Props {
  icon?: string | ReactElement
  label?: string
  className?: string
  onClick?: () => void
  selected?: boolean
  children?: ReactElement | ReactElement[]
}

 const PaymentMethodCardInner = ({ icon, label, className, children, onClick, selected}: Props, ref) => {
  const {t} = useTranslation()
  return (
    <div ref={ref} className={classNames(styles.root, {[styles.selected]: selected}, className)} onClick={onClick}>
      {children ? children : <>
        {icon && typeof icon === 'string' && <img  className={styles.icon} src={icon} alt=''/>}
        {icon &&  typeof icon !== 'string' && icon}
        <div className={classNames(styles.label)}>
          {label}
        </div>
      </>}

    </div>
  )
}
export const PaymentMethodCard = forwardRef(PaymentMethodCardInner)
