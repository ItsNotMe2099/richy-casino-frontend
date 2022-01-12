import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { isServer } from 'utils/media'
import Modal from 'components/ui/Modal'
import ModalLogin from 'components/Auth/ModalLogin'
import ModalPasswordRecovery from 'components/Auth/ModalPasswordRecovery'
import ModalPasswordReset from 'components/Auth/ModalPasswordReset'
import ModalRegistration from 'components/Auth/ModalRegistration'
import ModalRegistrationSuccess from 'components/Auth/ModalRegistrationSuccess'
import PaymentHistory from 'components/Profile/PaymentHistory'

interface Props {}

export default function ModalContainer(props: Props) {
  const context = useAppContext()
  const commonSettings = {
    onRequestClose: context.hideModal,
  }

  return (
    <div aria-hidden="true">
      {!isServer && (
        <>
          <Modal key={0} isOpen={context.modal === ModalType.login} {...commonSettings} title='Авторизация'>
            <ModalLogin/>
          </Modal>
          <Modal key={1} isOpen={context.modal === ModalType.passwordRecovery} {...commonSettings} title='Восстановление пароля'>
            <ModalPasswordRecovery/>
          </Modal>
          <Modal key={2} isOpen={context.modal === ModalType.passwordReset} {...commonSettings} title='Восстановление пароля'>
            <ModalPasswordReset/>
          </Modal>
          <Modal key={3} isOpen={context.modal === ModalType.registration} {...commonSettings} title='Регистрация'>
            <ModalRegistration/>
          </Modal>
          <Modal key={4} isOpen={context.modal === ModalType.registrationSuccess} {...commonSettings} noBorder>
            <ModalRegistrationSuccess/>
          </Modal>
          <Modal key={5} isOpen={true} {...commonSettings} title='История платежей' size='large' profile userId='6171361'>
            <PaymentHistory/>
          </Modal>
        </>
      )}
    </div>
  )
}

