import styles from './index.module.scss'
import { useState} from 'react'
import { useTranslation } from 'next-i18next'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import PhoneForm from './Forms/PhoneForm'
import EmailForm from './Forms/EmailForm'
import SocialsForm from './Forms/SocialsForm'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import Image from 'next/image'


enum TabType{
  Email,
  Phone,
  Socials
}
interface Props {
  isBottomSheet?: boolean
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
      <Image src={logo} width={17} height={17}/>
      <div className={classNames(styles.label, {[styles.mobile]: isActive })}>
        {label}
      </div>
    </div>
  )
}

export default function ModalRegistration(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [variant, setVariant] = useState<TabType>(TabType.Phone)
  const variants = [
    {logo: '/img/Auth/mail.svg', label: t('registration_tab_fast'), tab: TabType.Email},
    {logo: '/img/Auth/phone.svg', label: t('registration_tab_phone'), tab: TabType.Phone},
    {logo: '/img/Auth/chat.svg', label: t('registration_tab_socials'), tab: TabType.Socials},
  ]

  const result = (<>
    {appContext.showBonus && <div className={styles.banner}>
      <BonusSmallBanner style='wallet'/>
    </div>}
    <div className={styles.wrapper}>
    <div className={styles.variants}>
      {variants.map((item, index) =>
        <Tab label={item.label} logo={item.logo} key={index} tab={item.tab} isActive={variant === item.tab} onSelect={() => setVariant(item.tab)}/>
      )}
    </div>
    </div>
    {variant === TabType.Phone && <PhoneForm/>}
    {variant === TabType.Email && <EmailForm/>}
    {variant === TabType.Socials && <SocialsForm />}
    </>)

  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('registration_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('registration_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
