import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from '../SwitchFilter'

interface IGame{
  label: string
  image: string
  top: boolean
  createdAt: string
  lastWin: string
  category: string
  provider: string
}

interface Props {
  items?: IGame[]
}

export default function GamesListTop(props: Props) {

  const Item = (prop:{item: IGame}) => {

    return(
    <div className={styles.item}>
      <img src={prop.item.image} alt=''/>
      <div className={styles.label}>
        {prop.item.label}
      </div>
      <div className={styles.user}>
        Username
      </div>
      <div className={styles.win}>
        <span>Win:</span> 8410 Р
      </div>
    </div>
    )
  }

  return (
      <div className={styles.root}>
        <Header icon='/img/Contents/money.svg' label='ТОП игры' games length={1} catalogTop/>
        <div className={styles.wrapper}><SwitchFilter top/></div>
        <div className={styles.list}>
          {props.items && props.items.slice(0, 6).map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </div>
      </div>
  )
}
