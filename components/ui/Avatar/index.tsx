import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  avatar: string
  style?: 'circle'
}

export default function Avatar({avatar, style}: Props) {

  const avatarClass = {
    [styles.circle]: style === 'circle'
  }

  return (
    <div className={classNames(styles.root, avatarClass)}>
      <img src={avatar} alt=''/>
    </div>
  )
}
