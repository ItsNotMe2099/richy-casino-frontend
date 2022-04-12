import styles from './index.module.scss'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'

interface Props {
  
}

interface ItemProps {
  icon: string
  label: string
  onClick: () => void
}

enum ActionType{
  Sheet
}

export default function UserFooter(props: Props) {

  const items = [
    {label: 'Main', icon: '/img/UserFooter/user.svg', key: null},
    {label: 'Poker', icon: '/img/UserFooter/poker.svg', key: null},
    {label: 'Casino', icon: '/img/UserFooter/casino.svg', key: null},
    {label: 'Menu', icon: '/img/UserFooter/menu.svg', key: ActionType.Sheet},
  ]

  const Item = ({icon, label, onClick}: ItemProps) => {
    return (
      <div className={styles.item} onClick={onClick}>
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }

  const {showModal} = useAppContext()
  const context = useAppContext()

  const handleClickItem = (item) => {
    switch (item.key) {
      case ActionType.Sheet:
        if(context.modal === ModalType.profileBurger){
          context.hideModal()
        }
        else{
          showModal(ModalType.profileBurger)
        }
        break
    }
  }

  return (
    <VisibleXs>
      <div className={styles.root}>
        {items.slice(0, 2).map((item, index) =>
          <Item onClick={() => handleClickItem(item)} icon={item.icon} label={item.label} key={item.key}/>
        )}
        <div className={styles.joystick}>
          <img src='/img/UserFooter/joystick.svg' alt=''/>
        </div>
        {items.slice(2, items.length).map((item, index) =>
          <Item 
          onClick={() => handleClickItem(item)} 
          icon={item.label === 'Menu' && context.modal === ModalType.profileBurger ? '/img/UserFooter/close.svg' : item.icon} label={item.label} key={item.key}/>
        )}
      </div>
    </VisibleXs>
  )
}

