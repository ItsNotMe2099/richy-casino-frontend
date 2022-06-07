import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'

import {useAppContext} from 'context/state'
import classNames from 'classnames'
import PromoCode from 'components/for_pages/Common/Promocode'
import {useState} from 'react'


interface Props {
}

export default function FormPromocode(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [promoCode, setPromoCode] = useState(false)
  return (<>
      <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
        <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
        <span>{t('registration_has_promocode')}</span>
      </div>
      {promoCode &&
      <PromoCode/>
      }
    </>
  )
}
