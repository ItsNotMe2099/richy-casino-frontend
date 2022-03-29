import styles from './index.module.scss'
import {ReactElement} from 'react'
import Button from 'components/ui/Button'
import {useGameContext} from 'components/for_pages/games/context/state'
interface Props{
 children?: ReactElement | ReactElement[] | string,
  onClick?: (e) => void,
  type?: 'button' | 'submit'
}
export default function GamePageBetButton({children, onClick, type}: Props) {
  const gameContext = useGameContext()

  return (
    <Button disabled={gameContext.startLoading || gameContext.turnLoading} className={styles.root} size='normal' fluid background='blueGradient500' type={type} onClick={onClick}>
      {children || 'Ставка'}
    </Button>
  )
}
GamePageBetButton.defaultProps = {
  type: 'submit'
}

