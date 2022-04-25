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
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapImage}>
        <img src="/img/Fortune/winner.svg" alt="" className={styles.image}/>
      </div>

      <div className={styles.title}>
        You Win
      </div>

      <div className={styles.wrapValue}>
        <span className={styles.value}>
          {props.data?.winAmount}
        </span>
        <span className={styles.currency}>
          {props.data?.currencyIso}
        </span>
      </div>

      <div className={styles.wrapButton}>
        <Button
          onClick={() => {
            props.onRequestClose()
          }}
          className={styles.button}
          background="pink"
        >
          Collect Now
        </Button>
      </div>
    </div>
  )
}

