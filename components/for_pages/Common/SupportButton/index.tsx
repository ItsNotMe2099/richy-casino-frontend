import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useTranslation} from 'next-i18next'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function SupportButton(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.support}>
      <Button className={props.className} size='normal' background='dark700'><img src='/img/layout/footer/support.svg' alt=''/>{t('support_button')}</Button>
    </div>
  )
}

