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
      {modalKey === ModalType.registration && <ModalRegistration isOpen={true} onRequestClose={close} />}
      {modalKey === ModalType.login && <ModalLogin isOpen={true} onRequestClose={close} />}
      {modalKey === ModalType.passwordRecovery && <ModalPasswordRecovery isOpen={true} onRequestClose={close} />}
      {modalKey === ModalType.passwordReset && <ModalPasswordReset isOpen={true} onRequestClose={close} />}
    </>
  )
}

export default Modals
