import FAForm from './Form'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'

interface Props {

}

export default function FA(props: Props) {
  const {t} = useTranslation()
  return (
      <div className={styles.root}>
        <div className={styles.scan}>
          {t('2fa_text')}
        </div>
        <div className={styles.qr}>
          <img src='/img/2FA/qr.png' alt=''/>
        </div>
          <div className={styles.your}>
            {t('2fa_secret_key')}
          </div>
          <div className={styles.key}>
            18e6Ktb8GuyhfEq7r9mRfvk9xyJLzUN7XD
          </div>
          <div className={styles.important}>
            <span>{t('2fa_attention')}&nbsp;</span>  {t('2fa_text_2')}
          </div>
          <FAForm/>
      </div>
  )
}
