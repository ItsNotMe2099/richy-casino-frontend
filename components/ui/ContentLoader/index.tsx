import styles from './index.module.scss'
import classNames from 'classnames'

import RichyLoader from 'components/ui/RichyLoader'

interface Props {
  className?: string
  style?: 'fullscreen' | 'block' | 'infiniteScroll'
  isOpen?: boolean
}

export default function ContentLoader(props: Props) {
  return (
    <div className={classNames(styles.root, props.className, {
      [styles.fullscreen]: props.style === 'fullscreen',
      [styles.block]: props.style === 'block',
      [styles.infiniteScroll]: props.style === 'infiniteScroll',
      [styles.open]: props.isOpen})}>
    <RichyLoader />
    </div>
  )
}
