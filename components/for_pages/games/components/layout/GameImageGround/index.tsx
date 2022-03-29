import styles from './index.module.scss'
import cx from 'classnames'
interface Props{

}
export default function GameImageGround(props: Props) {
  return (
    <div className={cx(styles.root)}>
      <img src={'/img/Games/ground.png'}/>
    </div>
  )
}


