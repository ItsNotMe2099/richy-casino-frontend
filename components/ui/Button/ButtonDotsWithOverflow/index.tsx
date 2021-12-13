import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import Dots from 'components/svg/Dots'


import { useRouter } from 'next/router'

interface Props {
  children?: React.ReactNode
}

export const ButtonDotsWithOverflow = (props: Props, ref) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const router = useRouter()

  return (
    <div className={styles.root}>
      <div onClick={onClick} className={styles.dropDownTrigger}>
        <div className={styles.dots}>
          <Dots/>
        </div>
      </div>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {props.children && props.children}
      </nav>
    </div>
  )
}
ButtonDotsWithOverflow.defaultProps = {
  options: [],
}
export default ButtonDotsWithOverflow
