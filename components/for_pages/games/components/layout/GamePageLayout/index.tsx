import styles from './index.module.scss'
import {Col, Row} from 'react-grid-system'
import {ReactElement} from 'react'
interface Props{
  header: ReactElement
  sideBar: ReactElement
  board: ReactElement
  history: ReactElement
}
export default function GamePageLayout(props: Props) {
  const {header, sideBar, board, history} = props
  return (
    <div className={styles.root}>
      <Row >
        <Col>{header}</Col>
      </Row>
      <div className={styles.columns}>
        <div className={styles.sideBar}>{sideBar}</div>
        <div className={styles.board}>{board}</div>
      </div>
      <Row >
        <Col>{history}</Col>
      </Row>
    </div>
  )
}


