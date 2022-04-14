import styles from 'components/for_pages/MoneyChess/components/Table/index.module.scss'
import Scrollbars from 'react-custom-scrollbars-2'
import classNames from 'classnames'
import {ReactElement} from 'react'






interface Props<T> {
  items?: T[]
  itemsSeparated?: T[][]
  style?: 'games' | 'bets'
  isStats?: boolean
  row: (isMobile: boolean, item: T) => ReactElement
  hasActionColumn?: boolean
}

export default function Table<T>(props: Props<T>) {

  const tableClass = {
    [styles.bets]: props.style === 'bets'
  }


  return (
    <div className={styles.root}>
      <table className={classNames(styles.table, tableClass)}>
        <thead>
        <tr>
          {props.style !== 'games' &&
          <th>
            Время
          </th>}
          <th>
            Игроки
          </th>
          <th>
            Тип игры
          </th>
          <th>
            Время
          </th>
          <th className={styles.bet}>
            {props.style === 'games' ? <>Ставка</> : <>Выигрыш</>}
          </th>
          {props.hasActionColumn && <th className={styles.action}/>}
        </tr>
        </thead>

        <Scrollbars style={{width: '100%', height: 250}}
                    renderTrackVertical={props => <div {...props} className={styles.track}/>}>
          {props.items?.length > 0 && <tbody>{props.items.map((item) => props.row(false, item))}</tbody>}
          {props.itemsSeparated?.length > 0 && props.itemsSeparated.map((group, index) => <tbody key={index}>{group.map( item => props.row(false, item))}<tr className={styles.separator} ><td colSpan={ props.hasActionColumn ? 5 : 4}><div className={styles.line}/></td></tr></tbody>)}
        </Scrollbars>

      </table>
      <section>
        <Scrollbars style={{width: '100%', height: 250}}
                    renderTrackVertical={props => <div {...props} className={styles.track}/>}>
          {props.items?.length > 0 && props.items.map((item) => props.row(true, item))}
          {props.itemsSeparated?.length > 0 && props.itemsSeparated.map((group, index) => <>{group.map( item => props.row(false, item))}<div className={styles.separatorMobile}/></>)}

        </Scrollbars>
      </section>
    </div>
  )
}
