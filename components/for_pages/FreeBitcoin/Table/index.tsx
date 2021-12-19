import styles from './index.module.scss'
import classNames from 'classnames'
import { Col } from 'react-grid-system'
import {format} from 'date-fns'

interface ILuckyNumber {
  number: string
  payout: string
}

interface ILast {
  date: string
  payout: string
}

interface Props {
  last?: boolean
  items: ILuckyNumber[] | ILast[]
}

export default function Table(props: Props) {

  const handleDate = (item) => {
    const date = new Date(item.date)
    return format(date, 'dd.MM.yyyy hh:mm')
  }

  return (
    <Col className={classNames(styles.col, {[styles.last]: props.last})}>
    <div className={styles.root}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>
            {!props.last ? <>LUCKY NUMBER</> : <>ПОСЛЕДНИЕ ВЫИГРЫШИ</>}
          </div>
          <div className={styles.cell}>
            {!props.last ? <div className={classNames(styles.text, styles.payout)}>PAYOUT</div> : null}
          </div>
        </div>
        {props.items.map((item, index) =>
          <div className={classNames(styles.row, styles.rowInner)} key={index}>
            <div className={styles.cell}>
              <div className={classNames(styles.text, {[styles.date]: props.last})}>
                {props.last ? handleDate(item) : item.number}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.payout} <span>BTC</span>
              </div>
            </div>
          </div>
            )}
      </div>
    </div>
    </Col>
  )
}

