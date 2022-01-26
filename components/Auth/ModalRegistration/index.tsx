import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import ShortBanner from 'components/for_pages/Common/ShortBanner'
import PhoneForm from './Forms/PhoneForm'
import EmailForm from './Forms/EmailForm'
import SocialsForm from './Forms/SocialsForm'
import InfoRepository from 'data/repositories/InfoRepository'

enum TabType{
  Email,
  Phone,
  Socials
}
interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}
interface TabProps{
  logo: string,
  label: string,
  tab: TabType,
  isActive: boolean
  onSelect: (tab) => void
}
const Tab = ({logo, label, tab, isActive, onSelect}: TabProps) => {

  return(
    <div className={classNames(styles.variant, {[styles.active]: isActive })} onClick={onSelect}>
      <img src={logo} alt=''/>
      <div className={classNames(styles.label, {[styles.mobile]: isActive })}>
        {label}
      </div>
    </div>
  )
}

export default function ModalRegistration(props: Props) {

  const [variant, setVariant] = useState<TabType>(TabType.Phone)


  const variants = [
    {logo: '/img/Auth/mail.svg', label: 'Быстрая', tab: TabType.Email},
    {logo: '/img/Auth/phone.svg', label: 'Телефон', tab: TabType.Phone},
    {logo: '/img/Auth/chat.svg', label: 'Соц. сети', tab: TabType.Socials},
  ]


  const { t } = useTranslation('common')

  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const getCurrencies = async () => {
      const res = await InfoRepository.getCurrencies()
      setCurrencies(res)
    }
    getCurrencies()
  }, [])

  return (
    <>
    <div className={styles.banner}>
      <ShortBanner/>
    </div>
      <div className={styles.variants}>
        {variants.map((item, index) =>
          <Tab label={item.label} logo={item.logo} key={index} tab={item.tab} isActive={variant === item.tab} onSelect={() => setVariant(item.tab)}/>
        )}
      </div>
      {variant === TabType.Phone && <PhoneForm currencies={currencies}/>}
      {variant === TabType.Email && <EmailForm currencies={currencies}/>}
      {variant === TabType.Socials && <SocialsForm currencies={currencies}/>}
    </>
  )
}
