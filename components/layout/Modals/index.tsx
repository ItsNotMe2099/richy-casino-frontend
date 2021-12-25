import ModalRegistration from 'components/Auth/ModalRegistration'
import { useModal } from 'store/modal-store'
import {ModalType} from 'types/enums'

interface Props {}

const Modals = (props: Props) => {
  const { modalKey, close } = useModal()
  return (
    <>
      {modalKey === ModalType.registration && <ModalRegistration isOpen={true} onRequestClose={close} />}
    </>
  )
}

export default Modals
