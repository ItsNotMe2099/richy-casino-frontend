import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import { IButton } from 'types/interfaces'

interface Props extends IButton {
  children?: React.ReactNode
  variant?: 'outlined' 
  color?: 'fill'
  size?: 'extraSmall' | 'small' | 'normal' | 'large'
  fluid?: boolean
  href?: string
  target?: string
  className?: string
  image?: string
  background?: 'dark700' | 'payGradient500' | 'dark500'
}

export default function Button(props: Props) {

  const btnClass = classNames({
      [styles.sizeExtraSmall]: props.size === 'extraSmall',
      [styles.sizeSmall]: props.size === 'small',
      [styles.sizeNormal]: props.size === 'normal',
      [styles.sizeLarge]: props.size === 'large',
      [styles.variantOutlined]: props.variant === 'outlined',
      [styles.fill]: props.color === 'fill',
      [styles.fluid]: props.fluid,
      [styles.dark700]: props.background === 'dark700',
      [styles.dark500]: props.background === 'dark500',
      [styles.payGradient500]: props.background === 'payGradient500'
  })

  return (
  <>
  {props.href ? (
    <Link href={props.href}>
      <a
        onClick={props.onClick}
        href={props.href}
        target={props.target}
        className={classNames(styles.link, btnClass, props.className)}
      >
        {props.image ? <img src={props.image} alt=""/> : props.children}
      </a>
    </Link>
  ) : (
    <button
      type={props.type}
      onClick={props.onClick}
      className={classNames(styles.btn, btnClass, props.className)}
    >
      {props.image ? <img src={props.image} alt=""/> : props.children}
    </button>
  
)}</>)
}

Button.defaultProps = {
  type: 'button',
  target: '',
}
