import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import { RemoveScroll } from 'react-remove-scroll'
import Wallet from 'components/Profile/Wallet'
import Widraw from 'components/Profile/Withdraw'
import ModalPasswordReset from 'components/Auth/ModalPasswordReset'
import ModalPasswordRecovery from 'components/Auth/ModalPasswordRecovery'
import ModalRegistrationSuccess from 'components/Auth/ModalRegistrationSuccess'
import ModalRegistrationPhone from 'components/Auth/ModalRegistrationPhone'
import ModalRegistration from 'components/Auth/ModalRegistration'
import ModalLogin from 'components/Auth/ModalLogin'
import Fortune from 'components/Fortune'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import ProfileBurger from 'components/ui/ProfileBurger'


interface Props {}

export default function BottomSheetContainer(props: Props) {
  const appContext = useAppContext()

  const handleClose = () => {
    appContext.hideBottomSheet()
  }
  return (
    <RemoveScroll enabled={!!appContext.bottomSheet}>
      <div className={styles.root} aria-hidden="true">
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.login}
          onClose={appContext.hideBottomSheet}
          snapPoints={[550]}
        >
          {appContext.bottomSheet == ModalType.login && <ModalLogin isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.registration}
          onClose={appContext.hideBottomSheet}
          snapPoints={[570]}
        >
          {appContext.bottomSheet == ModalType.registration && <ModalRegistration isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.registrationPhone}
          onClose={appContext.hideBottomSheet}
          snapPoints={[620]}
        >
          {appContext.bottomSheet == ModalType.registrationPhone && <ModalRegistrationPhone isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.registrationSuccess}
          onClose={appContext.hideBottomSheet}
          snapPoints={[620]}
        >
          {appContext.bottomSheet == ModalType.registrationSuccess && <ModalRegistrationSuccess isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.passwordRecovery}
          onClose={appContext.hideBottomSheet}
          snapPoints={[300]}
        >
          {appContext.bottomSheet == ModalType.passwordRecovery && <ModalPasswordRecovery isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.passwordReset}
          onClose={appContext.hideBottomSheet}
          snapPoints={[620]}
        >
          {appContext.bottomSheet == ModalType.passwordReset && <ModalPasswordReset isBottomSheet={true} />}
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ProfileModalType.wallet}
          onClose={appContext.hideBottomSheet}
          snapPoints={[400]}
        >
          {appContext.bottomSheet == ProfileModalType.wallet && <Wallet isBottomSheet={true} />}
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ProfileModalType.withdraw}
          onClose={appContext.hideBottomSheet}
          snapPoints={[620]}
        >
          {appContext.bottomSheet == ProfileModalType.withdraw && <Widraw isBottomSheet={true} />}
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.profileBurger}
          onClose={appContext.hideBottomSheet}
          snapPoints={[620]}
        >
          {appContext.bottomSheet == ModalType.profileBurger && <ProfileBurger onRequestClose={handleClose} isBottomSheet={true} />}
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet === ModalType.fortune}
          onClose={appContext.hideBottomSheet}
          snapPoints={[450]}
        >
          {appContext.bottomSheet == ModalType.fortune && (
            <BottomSheetLayout lineOver>
              <Fortune isBottomSheet />
            </BottomSheetLayout>
          )}
        </Sheet>
      </div>
    </RemoveScroll>
  )
}

