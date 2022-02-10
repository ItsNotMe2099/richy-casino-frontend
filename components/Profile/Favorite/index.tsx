import styles from './index.module.scss'

interface Props {
  
}

interface ItemProps {
  icon: string
}

export default function Favorite(props: Props) {

  const Item = ({icon}: ItemProps) => {
    return (
      <div className={styles.item} style={{backgroundImage: `url(${icon})`}}>
        <div className={styles.star}>
          <img src='/img/Favorite/star.svg' alt=''/>
        </div>
      </div>
    )
  }

  const games = [
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
    {icon: '/img/Favorite/games.png'},
  ]

  return (
    <div className={styles.root}>
      {games.map((item, index) => 
        <Item icon={item.icon} key={index}/>
      )}
    </div>
  )
}
