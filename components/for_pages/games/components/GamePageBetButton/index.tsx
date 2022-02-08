import styles from './index.module.scss'
import {ReactElement} from 'react'
import Button from 'components/ui/Button'
interface Props{
 children?: ReactElement | ReactElement[] | string,
  onClick?: (e) => void,
  type?: 'button' | 'submit'
}
export default function GamePageBetButton({children, onClick, type}: Props) {
  return (
    <Button className={styles.root} size='normal' fluid background='blueGradient500' type={type} onClick={onClick}>
      {children || 'Ставка'}
    </Button>
  )
}
GamePageBetButton.defaultProps = {
  type: 'submit'
}

