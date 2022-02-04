import styles from 'pages/catalog/index.module.scss'
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
      <Row className={styles.columns}>
        <Col>{sideBar}</Col>
        <Col>{board}</Col>
      </Row>
      <Row >
        <Col>{history}</Col>
      </Row>
    </div>
  )
}


