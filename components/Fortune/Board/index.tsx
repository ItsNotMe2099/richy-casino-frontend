import styles from './index.module.scss'
import Desk from './Desk'

interface Props {}

export default function Board(props: Props) {
  const canvasSize = 391

  return (
    <div className={styles.root} style={{ width: canvasSize, height: canvasSize}}>
      <Desk
        settings={{
          size: canvasSize,
          numberOfSections: 16,
        }}
      />
    </div>
  )
}

