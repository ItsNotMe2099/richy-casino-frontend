import Button from 'components/ui/Button'
import { format } from 'date-fns'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import {useTranslation} from 'next-i18next'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'

interface Props {

}

interface ItemProps {
  label?: string
  usdt?: string
  btc: string
  date: string
  icon: string
  id: string
}

export default function BetsHistory(props: Props) {
  const {t} = useTranslation()
  const items = [
    {label: 'Aviator', icon: '/img/BetsHistory/aviator.svg', date: '2021-12-27T12:46:24.007Z', usdt: '+ 0.00000001', btc: '0.00000000 BTC', id: '87345678987654321245'},
    {label: 'Aviator', icon: '/img/BetsHistory/aviator.svg', date: '2021-12-27T12:46:24.007Z', usdt: '+ 0.00000001', btc: '0.00000000 BTC', id: '87345678987654321245'},
    {label: 'Aviator', icon: '/img/BetsHistory/aviator.svg', date: '2021-12-27T12:46:24.007Z', usdt: '0.00000001', btc: '0.00000000 BTC', id: '87345678987654321245'},
    {label: 'Aviator', icon: '/img/BetsHistory/aviator.svg', date: '2021-12-27T12:46:24.007Z', usdt: '+ 0.00000001', btc: '0.00000000 BTC', id: '87345678987654321245'},
  ]

  const Item = ({label, icon, date, usdt, btc, id}: ItemProps) => {

    return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.game}>
          <HiddenXs>
            <div className={styles.icon}>
              <img src={icon} alt=''/>
            </div>
          </HiddenXs>
          <div>
            <div className={styles.label}>{label}</div>
            <div className={styles.id}>
              {id}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.date}>{format(new Date(date), 'dd MMMM yyyy · hh:mm')}</div>
        <div className={classNames(styles.usdt, {[styles.plus]: usdt.slice(0, 1) === '+'})}>{usdt} <span>USDT</span></div>
        <div className={classNames(styles.btc, {[styles.plus]: usdt.slice(0, 1) === '+'})}>{btc}</div>
      </div>
    </div>
    )
  }


  return (
    <ProfileModalLayout fixed>
      <ProfileModalHeader title={t('bets_history_title')}/>
        <ProfileModalBody fixed>
          {items.map((item, index) =>
            <Item label={item.label} btc={item.btc} date={item.date} usdt={item.usdt} key={index} icon={item.icon} id={item.id}/>
          )}
        </ProfileModalBody>
      <ProfileModalFooter>
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500'>{t('bets_history_deposit')}</Button>
        </div>
      </ProfileModalFooter>

    </ProfileModalLayout>
  )
}
