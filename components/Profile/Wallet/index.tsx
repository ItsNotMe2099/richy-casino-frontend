import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import StepMethod from 'components/Profile/Wallet/StepMethod'
import StepCurrency from 'components/Profile/Wallet/StepCurrency'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import {IDepositCryptoResponse, IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import {WalletHeader} from 'components/Profile/Wallet/WalletHeader'
import ModalFooterTwoFa from 'components/Profile/layout/ModalFooterTwoFa'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import PaymentMethodRepository from 'data/repositories/PaymentMethodRepository'
import ContentLoader from 'components/ui/ContentLoader'
import StepFormFiat from 'components/Profile/Wallet/StepFormFiat'
import StepPaymentSystem from 'components/Profile/Wallet/StepPaymentSystem'
import {ICurrency} from 'data/interfaces/ICurrency'
import {PaymentStep} from 'types/interfaces'
import StepForm from 'components/Profile/Wallet/StepForm'
import StepCrypto from 'components/Profile/Wallet/StepCrypto'

interface Props {
  isBottomSheet?: boolean
}


export default function Wallet(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()

  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [method, setMethod] = useState<IPaymentMethod | null>(null)
  const [paymentSystem, setPaymentSystem] = useState<IPaymentSystem | null>(null)
  const [currency, setCurrency] = useState<ICurrency | null>(null)
  const [depositResponse, setDepositResponse] = useState<IDepositResponse>(null)
  const [step, setStep] = useState<PaymentStep>(PaymentStep.Method)
  useEffect(() => {
    PaymentMethodRepository.fetchDeposit().then(i => {
      setPaymentMethods(i)
      if(i.length === 1){
        setMethod(i[0])
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
    setStep(method.isCrypto ? PaymentStep.Currency : PaymentStep.Form)
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
      case PaymentStep.Currency:
        setStep(PaymentStep.Method)
        break
      case PaymentStep.Form:
        setStep(method.isCrypto ? PaymentStep.Currency : PaymentStep.Method)
        break
      case PaymentStep.Success:
        setStep(PaymentStep.Form)
        break
    }
  }
  const result =  loading ? (<ContentLoader style={'block'} isOpen={loading}/>) : (
    <div className={styles.root}>

      {step === PaymentStep.Method && <div className={styles.stepTitle}>
        {t('wallet_payment_method_choose')}
      </div>}
      {(step !== PaymentStep.Success && context.showBonus) && <div className={styles.banner}>
        <BonusSmallBanner style='wallet'/>
      </div>}

      {step === PaymentStep.Method && <StepMethod paymentMethods={paymentMethods} onChange={handlePaymentMethod}/>}
      {step === PaymentStep.PaymentSystem && <StepPaymentSystem method={method} onChange={handlePaymentSystemMethod} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Currency && <StepCurrency method={method} paymentSystem={paymentSystem} onChange={handleCurrency} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Success && <StepCrypto  method={method} currency={currency} response={depositResponse as IDepositCryptoResponse} onSetStep={handleSetStep}/>}
    </div>
  )
  if(step === PaymentStep.Form){
   return  method.isCrypto ? <StepForm isBottomSheet={props.isBottomSheet} paymentSystem={paymentSystem} method={method} currency={currency} onSubmit={handleSubmit} onSetStep={handleSetStep} onBackClick={handleBack}/>
     : <StepFormFiat isBottomSheet={props.isBottomSheet} paymentSystem={paymentSystem} method={method} currency={context.currencies.find(i => i.iso === context.user.currencyIso)} onSubmit={handleSubmit} onSetStep={handleSetStep} onBackClick={handleBack}/>
  }
  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <WalletHeader isBottomSheet/>
      <BottomSheetBody className={styles.sheetBody}>
        {result}
      </BottomSheetBody>
      <ModalFooterTwoFa/>
    </BottomSheetLayout>)
  } else {
    return (<ProfileModalLayout fixed>
        <WalletHeader showBack={step !== PaymentStep.Method} onBackClick={step !== PaymentStep.Method ? handleBack : null}/>
        <ProfileModalBody fixed>
          {result}
        </ProfileModalBody>
        <ModalFooterTwoFa/>
      </ProfileModalLayout>
    )
  }
}
