import styles from './index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'

interface Props {
  className?: string
}

export default function FAFooter(props: Props) {

    return (
      <div className={classNames(styles.root, props.className)}>
        <div className={styles.text}>
          Повысьте безопасность аккаунта с помощью двухфакторной аутентификации
        </div>
        <Button background={'payGradient500'} type='submit' className={styles.btn}>
          Включить 2FA
        </Button>
      </div>
    )
}
