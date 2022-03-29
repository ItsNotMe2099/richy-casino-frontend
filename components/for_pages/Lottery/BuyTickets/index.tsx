import styles from './index.module.scss'
import Panel from 'components/layout/Panel'
import classNames from 'classnames'
import { Col } from 'react-grid-system'
import BuyTicketsForm from './Form'
import Statistics from '../Statistics'
import HiddenXs from 'components/ui/HiddenXS'

interface Props {
  
}

export default function BuyTickets(props: Props) {

  const TopItem = (prop:{title: string, number: string, className: string, classColor: string}) => {

    return (
      <div className={classNames(styles.item, prop.className)}>
        <div className={classNames(styles.title, prop.classColor)}>
          {prop.title}
        </div>
        <div className={styles.number}>
          {prop.number}
        </div>
      </div>
    )
  }

  return (
    <Col className={styles.root}>
    <Panel className={styles.panel}>
      <HiddenXs>
        <Statistics className={styles.statistics}/>
      </HiddenXs>
      <div className={styles.buy}>
        BUY LOTTERY TICKETS
      </div>
      <BuyTicketsForm/>
    </Panel>
    </Col>
  )
}

