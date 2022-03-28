import styles from './index.module.scss'

import cx from 'classnames'
import {DiamondColor} from 'components/for_pages/games/Diamonds/data/enums'

interface Props{
  color: DiamondColor
}
export default function Diamond(props: Props) {
  const renderDiamond = (color) => {
    return   (<div className={cx(styles.diamond, {[styles.visible]: color === props.color})}><img src={`/img/Games/diamonds/diamond_${color}.png`}/></div>)
  }
  return (
    <div className={cx(styles.root)}>
        {props.color ? renderDiamond(props.color) : <div className={styles.diamond}/>}

      <div className={styles.ground}><img src={'/img/Games/diamonds/ground.png'}/></div>
    </div>
  )
}


