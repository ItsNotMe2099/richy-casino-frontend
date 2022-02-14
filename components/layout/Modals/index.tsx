import { useAppContext } from 'context/state'
import { ModalType, ProfileModalType } from 'types/enums'
import { isServer } from 'utils/media'
import Modal from 'components/ui/Modal'
import ModalLogin from 'components/Auth/ModalLogin'
import ModalPasswordRecovery from 'components/Auth/ModalPasswordRecovery'
import ModalPasswordReset from 'components/Auth/ModalPasswordReset'
import ModalRegistration from 'components/Auth/ModalRegistration'
import ModalRegistrationSuccess from 'components/Auth/ModalRegistrationSuccess'
import PaymentHistory from 'components/Profile/PaymentHistory'
import ProfileModal from 'components/ui/ProfileModal'
import Profile from 'components/Profile/Profile'
import Settings from 'components/Profile/Settings'
import Fortune from 'components/Fortune'
import BonusModal from 'components/ui/BonusModal'
import ModalRegistrationPhone from 'components/Auth/ModalRegistrationPhone'
import ProfileBurger from 'components/ui/ProfileBurger'
import Favorite from 'components/Profile/Favorite'
import styles from './index.module.scss'
import BetsHistory from 'components/Profile/BetsHistory'
import Wallet from 'components/Profile/Wallet'
import Exchange from 'components/Profile/Exchange'
import BuyCrypto from 'components/Profile/BuyCrypto'
import FA from 'components/Profile/FA'
import Withdraw from 'components/Profile/Withdraw'

interface Props {}

export default function ModalContainer(props: Props) {
  const context = useAppContext()
  const commonSettings = {
    onRequestClose: context.hideModal,
  }

  const user = {id: '6171361', balance: '$275.16', userName: 'Alex', name: 'Ерохин Иван Иванович', dateOfBirth: '15.12.1998',
  country: 185, currency: 121, phone: '8 (800) 800 88 88', email: 'pochta@mail.ru', password: 'qwerty123'
}


  return (
    <div aria-hidden="true">
      {!isServer && (
        <>
          <Modal key={0} isOpen={context.modal === ModalType.login} {...commonSettings} title='Авторизация'>
            <ModalLogin/>
          </Modal>
          <Modal key={3} isOpen={context.modal === ModalType.passwordRecovery} {...commonSettings} title='Восстановление пароля'>
            <ModalPasswordRecovery/>
          </Modal>
          <Modal key={2} isOpen={context.modal === ModalType.passwordReset} {...commonSettings} title='Восстановление пароля'>
            <ModalPasswordReset/>
          </Modal>
          <Modal key={1} isOpen={context.modal === ModalType.registration} {...commonSettings} title='Регистрация'>
            <ModalRegistration/>
          </Modal>
          <Modal key={4} isOpen={context.modal === ModalType.registrationSuccess} {...commonSettings} noBorder>
            <ModalRegistrationSuccess/>
          </Modal>

          <ProfileModal isBack={true} size='large' key={5} isOpen={context.modal === ProfileModalType.paymentHistory} {...commonSettings} title='История платежей' user={user} payment>
            <PaymentHistory/>
          </ProfileModal>
          <ProfileModal key={6} isOpen={context.modal === ProfileModalType.profile} {...commonSettings} title='Профиль' user={user} profile>
            <Profile/>
          </ProfileModal>
          <ProfileModal isBack={true} size='large' key={7} isOpen={context.modal === ProfileModalType.settings} {...commonSettings} title='Настройки' user={user}>
            <Settings user={user}/>
          </ProfileModal>
          <Wallet/>
          <Modal fortune key={9} isOpen={context.modal === ModalType.fortune} {...commonSettings} noBorder size='fortune'>
            <Fortune/>
          </Modal>
          <Modal key={12} isOpen={context.modal === ModalType.registrationPhone} {...commonSettings} noBorder>
            <ModalRegistrationPhone/>
          </Modal>
          <BonusModal isOpen={context.modal === ModalType.bonus} {...commonSettings}/>
          <ProfileBurger key={11} isOpen={context.modal === ModalType.profileBurger} {...commonSettings} user={user}/>
          <ProfileModal 
          size='small'
          key={13} isBack={true} isOpen={context.modal === ProfileModalType.exchange} {...commonSettings} title='Обмен' user={user} payment noBorder>
            <Exchange user={user}/>
          </ProfileModal>
          <ProfileModal 
          className={styles.favorite}
           key={14} 
           isOpen={context.modal === ProfileModalType.favorite} 
           size='large' {...commonSettings} 
           title='Избранное' user={user} 
           isBack={true}
           style='favorite'
           >
            <Favorite/>
          </ProfileModal>
          <ProfileModal isBack={true} size='large' key={15} isOpen={context.modal === ProfileModalType.betsHistory} {...commonSettings} title='История ставок' user={user} payment>
            <BetsHistory/>
          </ProfileModal>
          <ProfileModal 
          size='small'
          style='buyCrypto'
          key={16} isBack={true} isOpen={context.modal === ProfileModalType.buyCrypto} {...commonSettings} title='Купить криптовалюту' user={user} payment noBorder>
            <BuyCrypto user={user}/>
          </ProfileModal>
          <ProfileModal 
          size='small'
          style='2fa'
          key={17} isBack={true} isOpen={context.modal === ProfileModalType.FA} {...commonSettings} title='Безопасность 2FA' user={user}>
            <FA/>
          </ProfileModal>
          <Withdraw/>
        </>
      )}
    </div>
  )
}

