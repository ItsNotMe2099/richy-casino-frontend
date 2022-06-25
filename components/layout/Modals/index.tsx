import {useAppContext} from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import {isServer} from 'utils/media'
import Modal from 'components/ui/Modal'
import ModalLogin from 'components/Auth/ModalLogin'
import ModalPasswordRecovery from 'components/Auth/ModalPasswordRecovery'
import ModalPasswordReset from 'components/Auth/ModalPasswordReset'
import ModalRegistration from 'components/Auth/ModalRegistration'
import ModalRegistrationSuccess from 'components/Auth/ModalRegistrationSuccess'
import PaymentHistory from 'components/Profile/PaymentHistory'
import Profile from 'components/Profile/Profile'
import Settings from 'components/Profile/Settings'
import Fortune from 'components/Fortune'
import BonusModal from 'components/ui/BonusModal'
import ModalRegistrationPhone from 'components/Auth/ModalRegistrationPhone'
import ProfileBurger from 'components/ui/ProfileBurger'
import Favorite from 'components/Profile/Favorite'
import BetsHistory from 'components/Profile/BetsHistory'
import Wallet from 'components/Profile/Wallet'
import Exchange from 'components/Profile/Exchange'
import BuyCrypto from 'components/Profile/BuyCrypto'
import FA from 'components/Profile/FA'
import Withdraw from 'components/Profile/Withdraw'
import {RemoveScroll} from 'react-remove-scroll'
import {useTranslation} from 'next-i18next'
import ProfileModalNew from 'components/Profile/layout/ProfileModalNew'
import ModalConfirmOldPhone from 'components/Profile/ModalConfirmOldPhone'
import ModalConfirmNewPhone from 'components/Profile/ModalConfirmNewPhone'
import FALogin from 'components/Profile/FALogin'
import MobileAppModal from 'components/ui/MobileAppModal'

interface Props {
}

export default function ModalContainer(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const commonSettings = {
    onRequestClose: context.hideModal,
  }

  return (
    <RemoveScroll enabled={!!context.modal}>
      {!isServer && (

        <div aria-hidden="true">
          <ProfileModalNew key={0} size={'small'} isOpen={context.modal === ModalType.login} {...commonSettings}>
            {context.modal === ModalType.login && <ModalLogin/>}
          </ProfileModalNew>
          <ProfileModalNew key={3}  size={'small'} isOpen={context.modal === ModalType.passwordRecovery} {...commonSettings}>
            {context.modal === ModalType.passwordRecovery && <ModalPasswordRecovery/>}
          </ProfileModalNew>
          <ProfileModalNew key={2}  size={'small'} isOpen={context.modal === ModalType.passwordReset} {...commonSettings}>
            {context.modal === ModalType.passwordReset && <ModalPasswordReset/>}
          </ProfileModalNew>
          <ProfileModalNew key={1}   size={'small'} isOpen={context.modal === ModalType.registration} {...commonSettings}>
            {context.modal === ModalType.registration && <ModalRegistration/>}
          </ProfileModalNew>
          <ProfileModalNew key={12}  size={'small'} isOpen={context.modal === ModalType.registrationPhone} {...commonSettings}>
            <ModalRegistrationPhone/>
          </ProfileModalNew>
          <ProfileModalNew key={4}  size={'small'} isOpen={context.modal === ModalType.registrationSuccess} {...commonSettings}>
            {context.modal === ModalType.registrationSuccess && <ModalRegistrationSuccess/>}
          </ProfileModalNew>
          <ProfileModalNew size='large' key={5}
                           isOpen={context.modal === ProfileModalType.paymentHistory} {...commonSettings}>
            {context.modal === ProfileModalType.paymentHistory && <PaymentHistory/>}
          </ProfileModalNew>
          <ProfileModalNew key={6} isOpen={context.modal === ProfileModalType.profile} style='profile' size='profile' {...commonSettings} >
            {context.modal === ProfileModalType.profile && <Profile/>}
          </ProfileModalNew>
          <ProfileModalNew size={'large'} key={6}
                           isOpen={context.modal === ProfileModalType.settings} {...commonSettings} >
            {context.modal === ProfileModalType.settings && <Settings/>}
          </ProfileModalNew>

          <ProfileModalNew size={'small'} key={6}
                           isOpen={context.modal === ProfileModalType.wallet} {...commonSettings} >
            {context.modal === ProfileModalType.wallet && <Wallet/>}
          </ProfileModalNew>
          <ProfileModalNew size={'small'} key={6}
                           isOpen={context.modal === ProfileModalType.withdraw} {...commonSettings} >
            {context.modal === ProfileModalType.withdraw && <Withdraw/>}
          </ProfileModalNew>
          <Modal fortune key={9} isOpen={context.modal === ModalType.fortune} {...commonSettings} noBorder
                 size='fortune'>
            {context.modal === ModalType.fortune && <Fortune/>}
          </Modal>

          <BonusModal isOpen={context.modal === ModalType.bonus} {...commonSettings}/>

          <ProfileModalNew
            size='small'
            key={13}  isOpen={context.modal === ProfileModalType.exchange}>
            {context.modal === ProfileModalType.exchange && <Exchange/>}
          </ProfileModalNew>
          <ProfileModalNew size={'large'} key={6}
                           isOpen={context.modal === ProfileModalType.favorite} {...commonSettings} >
            {context.modal === ProfileModalType.favorite && <Favorite/>}
          </ProfileModalNew>
          <ProfileModalNew size={'large'} key={6}
                           isOpen={context.modal === ProfileModalType.betsHistory} {...commonSettings} >
            <BetsHistory/>
          </ProfileModalNew>
          <ProfileModalNew
            size='small'
            key={16}  isOpen={context.modal === ProfileModalType.buyCrypto} {...commonSettings}
            >
            {context.modal === ProfileModalType.buyCrypto && <BuyCrypto/>}
          </ProfileModalNew>
          <ProfileModalNew
            size='small'
            key={17} isOpen={context.modal === ProfileModalType.FA} {...commonSettings}
        >
            {context.modal === ProfileModalType.FA && <FA/>}
          </ProfileModalNew>

          <ProfileModalNew
            size='small'
            key={16}  isOpen={context.modal === ModalType.profileBurger} {...commonSettings}
          >
            <ProfileBurger onRequestClose={() => context.hideModal()}/>
          </ProfileModalNew>
          <ProfileModalNew
            size='small'
            key={17}  isOpen={context.modal === ProfileModalType.oldPhoneConfirm} {...commonSettings}
          >
            {context.modal === ProfileModalType.oldPhoneConfirm && <ModalConfirmOldPhone/>}
          </ProfileModalNew>
          <ProfileModalNew
            size='small'
            key={18}  isOpen={context.modal === ProfileModalType.newPhoneConfirm} {...commonSettings}
          >
            {context.modal === ProfileModalType.newPhoneConfirm && <ModalConfirmNewPhone/>}
          </ProfileModalNew>
          <ProfileModalNew
            size='small'
            key={19}  isOpen={context.modal === ModalType.faLogin} {...commonSettings}
          >
            {context.modal === ModalType.faLogin && <FALogin/>}
          </ProfileModalNew>
          <ProfileModalNew key={13} size={'small'} isOpen={context.modal === ModalType.mobileApp} {...commonSettings}>
            {context.modal === ModalType.mobileApp && <MobileAppModal/>}
          </ProfileModalNew>
        </div>
      )}
    </RemoveScroll>
  )
}

