import styles from './index.module.scss'
import { Row, Col } from 'react-grid-system'
import ConstantSlide from 'components/for_pages/Common/ConstantSlide'
import SlideSlider from './SlideSlider'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function TopSlider(props: Props) {

  return (
    <Row className={styles.root}>
      <ConstantSlide/>
      <SlideSlider/>
    </Row>
  )
}

