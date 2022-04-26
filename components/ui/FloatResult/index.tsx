import styles from './index.module.scss'
import FloatResultSvg from 'components/svg/FloatResultSvg'
import { colors } from 'scss/variables'
import classNames from 'classnames'

export enum FloatResultStyleType {
  idle,
  progress,
  success,
  fail,
}

interface Props {
  children: React.ReactNode
  styleType: FloatResultStyleType
  className?: string
}

export default function FloatResult(props: Props) {
  const getColor = (): string => {
    switch (props.styleType) {
      case FloatResultStyleType.idle:
        return colors.white
      case FloatResultStyleType.progress:
        return colors.magenta500
      case FloatResultStyleType.success:
        return colors.pay500
      case FloatResultStyleType.fail:
        return colors.lose500
    }
  }

  return (
    <div className={classNames([styles.root, props.className])}>
      <FloatResultSvg className={styles.background} color={getColor()}/>
      <div className={styles.text} style={{ color: getColor() }}>
        {props.children}
      </div>
    </div>
  )
}

