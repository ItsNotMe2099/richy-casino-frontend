import FAForm from './Form'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import { TwoFaModalArguments} from 'types/interfaces'
import {useAppContext} from 'context/state'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'

interface Props {

}

export default function FA(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const args = context.modalArguments as TwoFaModalArguments

  return (
    <ProfileModalLayout>
      <ProfileModalHeader title={t('2fa_title')}/>
      <div className={styles.root}>
        <div className={styles.scan}>
          {t('2fa_text')}
        </div>
        <div className={styles.qr}>
          <img src={args.qrUrl} alt=''/>
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
    </ProfileModalLayout>
  )
}
