import styles from './index.module.scss'
import classNames from 'classnames'
import Spinner from 'components/ui/Spinner'
import RSvg from 'components/svg/RSvg'
import { colors } from 'scss/variables'

interface Props {
  className?: string
}

export default function RichyLoader(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      <Spinner size={92} color={colors.blue500} secondaryColor="rgba(66,123,248,0.2)" thickness={180}/>
      <RSvg className={styles.logo}/>
    </div>
  )
}
