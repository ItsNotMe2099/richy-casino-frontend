import styles from './index.module.scss'
import Link from 'next/link'
import cx from 'classnames'
import { IButton } from 'types/interfaces'

export default function Button(props: IButton) {

  const getClassName = () => {
    return {

      [styles.sizeExtraSmall]: props.size === 'extraSmall',
      [styles.sizeSmall]: props.size === 'small',
      [styles.sizeNormal]: props.size === 'normal',
      [styles.sizeLarge]: props.size === 'large',
      [styles.variantOutlined]: props.variant === 'outlined',
      [styles.fill]: props.color === 'fill',
      [styles.fluid]: props.fluid,
      [styles.dark700]: props.background === 'dark700',
      [styles.payGradient500]: props.background === 'payGradient500'
    }
  }
  return (
  <>
  {props.href ? (
    <Link href={props.href}>
      <a
        onClick={props.onClick}
        href={props.href}
        target={props.target}
        className={cx(styles.link, getClassName(), props.className)}
      >
        {props.image ? <img src={props.image} alt=""/> : props.children}
      </a>
    </Link>
  ) : (
    <button
      type={props.type}
      onClick={props.onClick}
      className={cx(styles.btn, getClassName(), props.className)}
    >
      {props.image ? <img src={props.image} alt=""/> : props.children}
    </button>
  
)}</>)
}

Button.defaultProps = {
  type: 'button',
  target: '',
}
