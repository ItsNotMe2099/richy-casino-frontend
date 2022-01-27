import styles from './index.module.scss'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  
}

interface ItemProps {
  icon: string
  label: string
}

export default function UserFooter(props: Props) {

  const items = [
    {label: 'Main', icon: '/img/UserFooter/user.svg'},
    {label: 'Poker', icon: '/img/UserFooter/poker.svg'},
    {label: 'Casino', icon: '/img/UserFooter/casino.svg'},
    {label: 'Menu', icon: '/img/UserFooter/close.svg'},
  ]

  const Item = ({icon, label}: ItemProps) => {
    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }

  return (
    <VisibleXs>
      <div className={styles.root}>
        {items.slice(0, 2).map((item, index) =>
          <Item icon={item.icon} label={item.label} key={index}/>
        )}
        <div className={styles.joystick}>
          <img src='/img/UserFooter/joystick.svg' alt=''/>
        </div>
        {items.slice(2, items.length).map((item, index) =>
          <Item icon={item.icon} label={item.label} key={index}/>
        )}
      </div>
    </VisibleXs>
  )
}

