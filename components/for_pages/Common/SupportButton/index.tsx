import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useTranslation} from 'next-i18next'
import classNames from 'classnames'
import {useAppContext} from 'context/state'

interface Props {
  children?: React.ReactNode
  className?: string
  background?: 'dark700' | 'dark500'
}

export default function SupportButton(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()
  return (
      <Button className={classNames(styles.root, props.className)} onClick={appContext.openSupport} size='normal' background={props.background || 'dark700'}><img src='/img/layout/footer/support.svg' alt=''/>{t('support_button')}</Button>
  )
}

