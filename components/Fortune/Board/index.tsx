import styles from './index.module.scss'
import Desk from './Desk'
import { IWheelPlayResponse, IWheelSlot } from 'data/interfaces/IWheel'

interface Props {
  gameResult: IWheelPlayResponse
  slots: IWheelSlot[]
  canvasSize: number
}

export default function Board(props: Props) {
  const activeIndex = props.gameResult ? props.slots.findIndex((item) => {
    return item.winMoneyAmount === props.gameResult.winAmount && item.currencyIso === props.gameResult.currencyIso
  }) : -1

  return (
    <div className={styles.root} style={{ width: props.canvasSize, height: props.canvasSize}}>
      <Desk
        settings={{
          size: props.canvasSize,
          slots: props.slots
        }}
        inProgress={!!props.gameResult}
        activeSectionIndex={activeIndex < 0 ? 0 : activeIndex}
      />
      <img src="/img/Fortune/cursor.svg" alt="" className={styles.cursor}/>
    </div>
  )
}

