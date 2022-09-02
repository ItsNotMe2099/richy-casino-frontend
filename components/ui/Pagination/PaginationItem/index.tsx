import styles from './index.module.scss'
import classNames from 'classnames'
import SliderArrowSvg from 'components/svg/SliderArrowSvg'


interface Props {
  className?: string
  number?: number
  type: 'number' | 'break' | 'previous' | 'next'
  isActive?: boolean
}

export default function PaginationItem(props: Props) {
  const isArrow = ['previous', 'next'].includes(props.type)
  return (
    <div className={classNames(styles.root, props.className, {
      [styles.active]: props.isActive,
      [styles.isArrow]: isArrow,
      [styles.prev]: props.type === 'previous',
      [styles.next]: props.type === 'next',
      })}>
      {props.type === 'number' && props.number}
      {props.type === 'break' && '...'}
      {isArrow && <SliderArrowSvg className={classNames(styles.arrow, {[styles.prev]: props.type === 'previous', [styles.next]: props.type === 'next'})}/>}
    </div>
  )
}
