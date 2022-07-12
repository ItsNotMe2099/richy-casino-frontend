import {useState} from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import StepMethod from 'components/Profile/Wallet/StepMethod'
import StepCurrency from 'components/Profile/Wallet/StepCurrency'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import { IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import {WalletHeader} from 'components/Profile/Wallet/WalletHeader'
import ModalFooterTwoFa from 'components/Profile/layout/ModalFooterTwoFa'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { IPaymentSystem } from 'data/interfaces/IPaymentSystem'


enum PaymentStep {
  Method = 'method',
  Currency = 'currency',
  Form = 'form',
  Success = 'success'
}

interface Props {
  isBottomSheet?: boolean
}


export default function Wallet(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const paymentMethods = context.paymentMethodsDeposit
  const methods = [
    {label: t('wallet_payment_type_crypto'), bonus: true},
    {iconLabel: 'visa', label: t('wallet_payment_type_card')},
    {icon: '/img/Wallet/paypal.svg', label: 'PayPal'},
    {icon: '/img/Wallet/yoo.svg', label: 'YooMoney'},
    {icon: '/img/Wallet/web.svg', label: 'WebMoney'},
    {icon: '/img/Wallet/skrill.svg', label: 'Skrill'},
    {icon: '/img/Wallet/pia.svg', label: 'Piastrix'},
    {icon: '/img/Wallet/neteller.svg', label: 'Neteller'},
    {icon: '/img/Wallet/qiwi.svg', label: 'Qiwi'},
  ]

  const crypto = [
    {icon: '/img/Wallet/crypto/bitcoin.svg', label: 'Bitcoin', iso: 'btc'},
    {icon: '/img/Wallet/crypto/tether.svg', label: 'Tether', iso: 'th'},
    {icon: '/img/Wallet/crypto/eth.svg', label: 'Ethereum', iso: 'eth'},
    {icon: '/img/Wallet/crypto/tron.svg', label: 'Tron', iso: 'tr'},
    {icon: '/img/Wallet/crypto/usdc.svg', label: 'USD Coin', iso: 'USD'},
    {icon: '/img/Wallet/crypto/monero.svg', label: 'Monero', iso: 'mo'},
    {icon: '/img/Wallet/crypto/doge.svg', label: 'Doge', iso: 'dg'},
    {icon: '/img/Wallet/crypto/bitcoin-cash.svg', label: 'Bitcoin Cash', iso: 'btcc'},
    {icon: '/img/Wallet/crypto/litecoin.svg', label: 'Litecoin', iso: 'ltc'},
  ]

  const bank = [
    {icon: '/img/Wallet/bank/visa.svg', label: 'Visa'},
    {icon: '/img/Wallet/bank/master-card.svg', label: 'Master Card'},
    {icon: '/img/Wallet/bank/mir.svg', label: 'МИР'},
  ]

  const [method, setMethod] = useState<IPaymentMethod | null>(null)
  const [paymentSystem, setPaymentSystem] = useState<IPaymentSystem | null>(null)
  const [depositResponse, setDepositResponse] = useState<IDepositResponse>(null)
  const [step, setStep] = useState<PaymentStep>(PaymentStep.Method)
  const handleClose = () => {

    context.hideModal()
  }
  const handlePaymentMethod = (method: IPaymentMethod) => {
    setMethod(method)
    setStep(PaymentStep.Currency)
  }
  const handlePaymentSystemMethod = (paymentSystem: IPaymentSystem) => {
    setPaymentSystem(paymentSystem)
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
        setStep(PaymentStep.Currency)
        break
      case PaymentStep.Success:
        setStep(PaymentStep.Form)
        break
    }
  }
  const result = (
    <div className={styles.root}>
      {step === PaymentStep.Method && <div className={styles.stepTitle}>
        {t('wallet_payment_method_choose')}
      </div>}
      {(step !== PaymentStep.Success && context.showBonus) && <div className={styles.banner}>
        <BonusSmallBanner style='wallet'/>
      </div>}

      {step === PaymentStep.Method && <StepMethod paymentMethods={paymentMethods} onChange={handlePaymentMethod}/>}
      {step === PaymentStep.Currency && <StepCurrency method={method} onChange={handlePaymentSystemMethod} onSetStep={handleSetStep}/>}
      {/*step === PaymentStep.Success && <StepCrypto  paymentSystem={paymentSystem} method={method} response={depositResponse as IDepositCryptoResponse}/>*/}
    </div>
  )
  if(step === PaymentStep.Form){
   return null
    //return <StepForm isBottomSheet={props.isBottomSheet} currency={currency} method={method} onSubmit={handleSubmit} onSetStep={handleSetStep} onBackClick={handleBack}/>
  }
  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <WalletHeader isBottomSheet/>
      <BottomSheetBody className={styles.sheetBody}>
        {result}
      </BottomSheetBody>
      {step === PaymentStep.Success && <ModalFooterTwoFa/>}
    </BottomSheetLayout>)
  } else {
    return (<ProfileModalLayout fixed>
        <WalletHeader showBack={step !== PaymentStep.Method} onBackClick={step !== PaymentStep.Method ? handleBack : null}/>
        <ProfileModalBody fixed>
          {result}
        </ProfileModalBody>
        {step === PaymentStep.Success && <ModalFooterTwoFa/>}
      </ProfileModalLayout>
    )
  }
}
