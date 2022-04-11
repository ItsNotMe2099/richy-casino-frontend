import styles from './index.module.scss'
import classNames from 'classnames'
import { Col } from 'react-grid-system'
import {format} from 'date-fns'
import { Scrollbars } from 'react-custom-scrollbars-2'

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
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.cell}>
              {!props.last ? <>LUCKY NUMBER</> : <>ПОСЛЕДНИЕ ВЫИГРЫШИ</>}
            </th>
            <th className={styles.cell}>
              {!props.last ? <div className={classNames(styles.text, styles.payout)}>PAYOUT</div> : null}
            </th>
          </tr>
        </thead>
        <tbody>
        <Scrollbars className={styles.scroll}>
        {props.items.map((item, index) =>
          <tr className={classNames(styles.row, styles.rowInner)} key={index}>
            <td className={styles.cell}>
              <div className={classNames(styles.text, {[styles.date]: props.last})}>
                {props.last ? handleDate(item) : item.number}
              </div>
            </td>
            <td className={classNames(styles.cell, {[styles.cellPayout]: !props.last})}>
              <div className={styles.text}>
                {item.payout} <span>BTC</span>
              </div>
            </td>
          </tr>
            )}
          </Scrollbars>
        </tbody>
      </table>
    </div>
    </Col>
  )
}

