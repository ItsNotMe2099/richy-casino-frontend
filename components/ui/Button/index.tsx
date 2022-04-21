import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import { IButton } from 'types/interfaces'
import Spinner from 'components/ui/Spinner'

interface Props extends IButton {
  children?: React.ReactNode
  variant?: 'outlined'
  color?: 'fill'
  size?: 'extraSmall' | 'small' | 'normal' | 'large' | 'play' | 'superExtraSmall' | 'huge' | 'submit'
  fluid?: boolean
  href?: string
  target?: string
  className?: string
  background?: 'dark700' | 'payGradient500' | 'dark500' | 'dark600' | 'blueGradient500' | 'blackTransparent' | 'white' | 'pink'
  disabled?: boolean
  spinner?: boolean
}

export default function Button(props: Props) {

  const btnClass = classNames({
      [styles.sizeSuperExtraSmall]: props.size === 'superExtraSmall',
      [styles.sizeExtraSmall]: props.size === 'extraSmall',
      [styles.sizeSmall]: props.size === 'small',
      [styles.sizeNormal]: props.size === 'normal',
      [styles.sizeLarge]: props.size === 'large',
      [styles.sizePlay]: props.size === 'play',
      [styles.sizeHuge]: props.size === 'huge',
      [styles.sizeSubmit]: props.size === 'submit',
      [styles.variantOutlined]: props.variant === 'outlined',
      [styles.fill]: props.color === 'fill',
      [styles.fluid]: props.fluid,
      [styles.dark700]: props.background === 'dark700',
      [styles.dark600]: props.background === 'dark600',
      [styles.dark500]: props.background === 'dark500',
      [styles.payGradient500]: props.background === 'payGradient500',
      [styles.blueGradient500]: props.background === 'blueGradient500',
      [styles.blackTransparent]: props.background === 'blackTransparent',
      [styles.white]: props.background === 'white',
      [styles.pink]: props.background === 'pink',
      [styles.disabled]: props.disabled
  })

  return (
  <>
  {props.href ? (
    <Link href={props.href}>
      <a
        onClick={!props.disabled ? props.onClick : null}
        href={props.href}
        target={props.target}
        className={classNames(styles.link, btnClass, props.className)}
      >
        {props.children}
      </a>
    </Link>
  ) : (
    <button
      disabled={props.disabled || props.spinner}
      type={props.type}
      onClick={!props.disabled ? props.onClick : null}
      className={classNames(styles.btn, btnClass, props.className)}
    >
            <span className={classNames({
              [styles.text]: true,
              [styles.textHidden]: props.spinner,
            })}>{props.children}</span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
       <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>
      </div>
    </button>

)}</>)
}

Button.defaultProps = {
  type: 'button',
  target: '',
}
