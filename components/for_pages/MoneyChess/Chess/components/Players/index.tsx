import styles from './index.module.scss'

interface IPlayer {
  avatar: string
  name: string
}

interface Props {
  players: IPlayer
}

export default function Players(props: Props) {

  return (
    <div className={styles.root}>
      
    </div>
  )
}
