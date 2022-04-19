import styles from './index.module.scss'
import { useState} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import PhoneForm from './Forms/PhoneForm'
import EmailForm from './Forms/EmailForm'
import SocialsForm from './Forms/SocialsForm'


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
  const {t} = useTranslation()
  const [variant, setVariant] = useState<TabType>(TabType.Phone)
  const variants = [
    {logo: '/img/Auth/mail.svg', label: t('registration_tab_fast'), tab: TabType.Email},
    {logo: '/img/Auth/phone.svg', label: t('registration_tab_phone'), tab: TabType.Phone},
    {logo: '/img/Auth/chat.svg', label: t('registration_tab_socials'), tab: TabType.Socials},
  ]


  return (
    <>
    <div className={styles.banner}>
      <BonusSmallBanner style='registration'/>
    </div>
      <div className={styles.variants}>
        {variants.map((item, index) =>
          <Tab label={item.label} logo={item.logo} key={index} tab={item.tab} isActive={variant === item.tab} onSelect={() => setVariant(item.tab)}/>
        )}
      </div>
      {variant === TabType.Phone && <PhoneForm/>}
      {variant === TabType.Email && <EmailForm/>}
      {variant === TabType.Socials && <SocialsForm />}
    </>
  )
}
