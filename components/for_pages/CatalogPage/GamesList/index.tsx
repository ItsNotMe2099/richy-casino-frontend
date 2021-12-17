import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from '../SwitchFilter'
import { useState } from 'react'

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
  all?: boolean
  live?: boolean
  richy?: boolean
}

export default function GamesList(props: Props) {

  const Item = (prop:{item: IGame}) => {

    return(
    <div className={styles.item}>
      <img src={prop.item.image} alt=''/>
    </div>
    )
  }

  const getLabel = () => {
    if(props.all){
      return 'Игры'
    }
    else if(props.live){
      return 'Live Casino'
    }
    else{
      return 'Richy Games'
    }
  }

  const getIcon = () => {
    if(props.all){
      return '/img/Contents/all-games.svg'
    }
    else if(props.live){
      return '/img/Contents/live.svg'
    }
    else{
      return '/img/Contents/gamepad.svg'
    }
  }

  const [isShow, setIsShow] = useState(false)


  return (
      <div className={styles.root}>
        <Header icon={getIcon()} label={getLabel()} games length={props.items.length}/>
        {!props.richy &&
        <div className={styles.wrapper}><SwitchFilter all={props.all}/></div>}
        <div className={styles.list}>
          {props.items && (isShow ? props.items : props.items.slice(0, 10)).map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </div>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
            <div className={styles.icon}>
              <img src='/img/CatalogPage/more.svg' alt=''/>
            </div>
            <div className={styles.text}>
              {isShow ? <>Меньше игр</> : <>Больше игр</>}
            </div>
          </div>
      </div>
  )
}
