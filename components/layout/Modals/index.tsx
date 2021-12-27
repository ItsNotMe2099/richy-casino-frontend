import ModalRegistration from 'components/Auth/ModalRegistration'
import { useModal } from 'store/modal-store'
import {ModalType} from 'types/enums'
import ModalLogin from 'components/Auth/ModalLogin'
import ModalPasswordRecovery from 'components/Auth/ModalPasswordRecovery'
import ModalPasswordReset from 'components/Auth/ModalPasswordReset'

interface Props {}

const Modals = (props: Props) => {
  const { modalKey, close } = useModal()
  return (
    <>
       <ModalRegistration isOpen={modalKey === ModalType.registration} onRequestClose={close} />
       <ModalLogin isOpen={modalKey === ModalType.login} onRequestClose={close} />
       <ModalPasswordRecovery isOpen={modalKey === ModalType.passwordRecovery } onRequestClose={close} />
      <ModalPasswordReset isOpen={modalKey === ModalType.passwordReset} onRequestClose={close} />
    </>
  )
}

export default Modals
