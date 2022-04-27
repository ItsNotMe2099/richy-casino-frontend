import styles from './index.module.scss'
import { MAX_FACTOR } from '../constants'
import { ISize } from 'types/interfaces'

interface Props {
  factor: number
  size: ISize
}

export default function BackgroundImage(props: Props) {
  const offsetFactorValue = props.factor > MAX_FACTOR ? props.factor - MAX_FACTOR : 0
  const offsetY = Math.round(props.size.height / MAX_FACTOR * offsetFactorValue / 2)
  return (
    <div className={styles.root} style={{ backgroundPositionY: offsetY }}/>
  )
}

