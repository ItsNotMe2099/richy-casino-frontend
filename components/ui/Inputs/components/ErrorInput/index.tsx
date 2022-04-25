import styles from './index.module.scss'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'

interface Props {
  error?: any,
  touched?: boolean,
  className?: string
}

export default function ErrorInput(props: Props) {
  const {t, i18n} = useTranslation()
  const { error, touched } = props
  if(touched && !!error) {
    return (<div className={classNames(styles.root, props.className)}><img src='/img/icons/error.svg' alt=''/>{i18n.exists(error) ? t(error) : error}</div>)
  }else{
    return (<></>)
  }
}
