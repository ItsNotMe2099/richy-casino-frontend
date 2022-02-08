import styles from './index.module.scss'
import {ReactElement} from 'react'
import cx from 'classnames'
import GamePageBoardToolbar from 'components/for_pages/games/components/layout/GamePageBoardToolbar'
import HiddenXs from 'components/ui/HiddenXS'
interface Props{
  className?: string
  children?: ReactElement | ReactElement[]
}
export default function GamePageBoardLayout({children, className}: Props) {
  return (
    <div className={cx(styles.root, className)}>
      {children}
      <HiddenXs>
        <GamePageBoardToolbar/>
      </HiddenXs>
    </div>
  )
}


