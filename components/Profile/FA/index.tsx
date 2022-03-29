import FAForm from './Form'
import styles from './index.module.scss'

interface Props {
  
}

export default function FA(props: Props) {

  return (
      <div className={styles.root}>
        <div className={styles.scan}>
          Отсканируйте QR-код с помощью приложения Google Authenticator или введите секретный ключ вручную.
        </div>
        <div className={styles.qr}>
          <img src='/img/2FA/qr.png' alt=''/>
        </div>
          <div className={styles.your}>
            Ваш секретный ключ
          </div>
          <div className={styles.key}>
            18e6Ktb8GuyhfEq7r9mRfvk9xyJLzUN7XD
          </div>
          <div className={styles.important}>
            <span>ВАЖНО:&nbsp;</span>Запишите этот код, никогда не раскрывайте его другим. Вы можете использовать его для восстановления доступа к своей учетной записи, если нет доступа к аутентификатору.
          </div>
          <FAForm/>
      </div>
  )
}