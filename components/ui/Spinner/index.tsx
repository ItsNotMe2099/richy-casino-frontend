import styles from './index.module.scss'
import { SpinnerCircular } from 'spinners-react'
import { colors } from 'scss/variables'
import classNames from 'classnames'

interface Props {
  size: number
  color?: string
  secondaryColor?: string
  center?: boolean
}

export default function Spinner(props: Props) {
  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.center]: props.center,
    })}>
      <SpinnerCircular
        size={props.size}
        color={props.color ?? colors.white}
        secondaryColor={props.secondaryColor ?? colors.dark100}
        thickness={150}
      />
    </div>
  )
}

