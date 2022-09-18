import {useEffect, useState} from 'react'
import styles from './index.module.scss'

import {useTranslation} from 'next-i18next'
import { PaymentStep, WithdrawModalArguments} from 'types/interfaces'
import {useAppContext} from 'context/state'
import {ICurrency} from 'data/interfaces/ICurrency'
import StepMethod from './StepMethod'
import StepCurrency from './StepCurrency'
import StepForm from './StepForm'
import StepCrypto from './StepCrypto'
import {IDepositCryptoResponse, IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import UserUtils from 'utils/user'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ModalFooterTwoFa from 'components/Profile/layout/ModalFooterTwoFa'
import PaymentMethodRepository from 'data/repositories/PaymentMethodRepository'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'



interface Props {
  isBottomSheet?: boolean
}

export default function Widraw(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()

  const args = context.modalArguments as WithdrawModalArguments

  const [account, setAccount] = useState<IUserBalanceCurrency>(args?.account ?? UserUtils.getMainBalanceReal(context?.user))
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [method, setMethod] = useState<IPaymentMethod | null>(null)
  const [paymentSystem, setPaymentSystem] = useState<IPaymentSystem | null>(null)
  const [currency, setCurrency] = useState<ICurrency | null>(null)
  const [depositResponse, setDepositResponse] = useState<IDepositResponse>(null)
  const [step, setStep] = useState<PaymentStep>(PaymentStep.Method)
  useEffect(() => {
    PaymentMethodRepository.fetchWithdraw().then(i => {
      setPaymentMethods(i)
      if(i.length === 1){
     //   setMethod(i[0])
      }
      setLoading(false)
    })
  }, [])
  const handleClose = () => {

    context.hideModal()
  }
  const handlePaymentMethod = (method: IPaymentMethod, paymentSystem: IPaymentSystem) => {
    setMethod(method)
    setPaymentSystem(paymentSystem ?? null)
    setCurrency(null)
    setStep(PaymentStep.Currency )
  }
  const handlePaymentSystemMethod = (paymentSystem: IPaymentSystem) => {
    setPaymentSystem(paymentSystem)
    setCurrency(context.currencies.find(i => i.iso === paymentSystem.settings[0].currencyIso))
    setStep(PaymentStep.Form)
  }
  const handleCurrency = (currency: ICurrency, paymentSystem?: IPaymentSystem | null) => {
    setCurrency(currency)
    if(paymentSystem){
      setPaymentSystem(paymentSystem)
    }
    setStep(PaymentStep.Form)
  }
  const handleSubmit = (deposit: IDepositResponse) => {
    setDepositResponse(deposit)
    setStep(PaymentStep.Success)
  }

  const handleSetStep = (step: PaymentStep) => {
    setStep(step)
  }
  const handleBack = () => {
    switch (step) {
      case PaymentStep.Method:
        handleClose()
        break
      case PaymentStep.Currency:
        setStep(PaymentStep.Method)
        break
      case PaymentStep.Form:
        setStep(PaymentStep.Currency)
        break
      case PaymentStep.Success:
        handleClose()
        break
    }
  }

  const result = (
    <div className={styles.root}>

      {step === PaymentStep.Method && <StepMethod account={account} paymentMethods={paymentMethods} onChange={handlePaymentMethod} onChangeUserAccount={setAccount}/>}
      {step === PaymentStep.Currency && <StepCurrency method={method} paymentSystem={paymentSystem}  onChange={handleCurrency} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Form && <StepForm account={account} currency={currency}  method={method} paymentSystem={paymentSystem} onSubmit={handleSubmit} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Success && <StepCrypto currency={currency} method={method} paymentSystem={paymentSystem} response={depositResponse as IDepositCryptoResponse}/>}
    </div>
  )

  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <BottomSheetHeader className={styles.sheetHeader} title={t('withdraw_title')}  suffix={ <div className={styles.userId}>ID {context.user?.id}</div>}/>
      <BottomSheetBody className={styles.sheetBody} detectKeyboard={step === PaymentStep.Form} footerHeight={73.8}>
        {result}
      </BottomSheetBody>
      <ModalFooterTwoFa/>
    </BottomSheetLayout>)
  } else {
    return (<ProfileModalLayout fixed>
        <ProfileModalHeader title={t('withdraw_title')} showId  showBack={step !== PaymentStep.Method} onBackClick={step !== PaymentStep.Method ? handleBack : null}></ProfileModalHeader>
        <ProfileModalBody fixed>
          {result}
        </ProfileModalBody>
        <ModalFooterTwoFa/>
      </ProfileModalLayout>
    )
  }

}
