import styles from './index.module.scss'
import classNames from 'classnames'
import Spinner from 'components/ui/Spinner'
import { colors } from 'scss/variables'
import Image from 'next/image'

interface Props {
  className?: string
}

export default function RichyLoader(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      <Spinner size={140} color={colors.pay500} secondaryColor="rgb(123, 210, 69, 0.2)" thickness={120}/>
      <div className={styles.logo}>
      <Image src={'/img/layout/logo_mobile.png'} width={52} height={44}/>
      </div>
    </div>
  )
}
