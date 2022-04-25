import styles from './index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import { IWheelPlayResponse } from 'data/interfaces/IWheel'

interface Props {
  data?: IWheelPlayResponse
  className: string
  onRequestClose: () => void
}

export default function Winner(props: Props) {
  const isWin = !!props.data?.winAmount

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapImage}>
        <img src="/img/Fortune/winner.svg" alt="" className={styles.image}/>
      </div>

      {isWin ? (
        <div className={classNames(styles.title, styles.win)}>
          You Win
        </div>
      ) : (
        <div className={classNames(styles.title, styles.lose)}>
          You Lose
        </div>
      )}

      {isWin && (
        <div className={styles.wrapValue}>
          <span className={styles.value}>
            {props.data?.winAmount}
          </span>
            <span className={styles.currency}>
            {props.data?.currencyIso}
          </span>
        </div>
      )}

      <div className={styles.wrapButton}>
        <Button
          onClick={() => {
            props.onRequestClose()
          }}
          className={styles.button}
          background="pink"
        >
          {isWin ? 'Collect Now' : 'Close'}
        </Button>
      </div>
    </div>
  )
}

