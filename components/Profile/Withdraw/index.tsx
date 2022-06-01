import {useState} from 'react'
import styles from './index.module.scss'

import {useTranslation} from 'next-i18next'
import {PaymentMethod, PaymentStep, WithdrawModalArguments} from 'types/interfaces'
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



interface Props {
  isBottomSheet?: boolean
}

export default function Widraw(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
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
  const args = context.modalArguments as WithdrawModalArguments

  const [account, setAccount] = useState<IUserBalanceCurrency>(args?.account ?? UserUtils.getMainBalanceReal(context?.user))
  const [method, setMethod] = useState<PaymentMethod>(null)
  const [currency, setCurrency] = useState<ICurrency>(null)
  const [depositResponse, setDepositResponse] = useState<IDepositResponse>(null)
  const [step, setStep] = useState<PaymentStep>(PaymentStep.Method)
  const handleClose = () => {

    context.hideModal()
  }
  const handlePaymentMethod = (method: PaymentMethod) => {
    setMethod(method)
    setStep(PaymentStep.Currency)
  }
  const handleCurrencyMethod = (currency: ICurrency) => {
    setCurrency(currency)
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

      {step === PaymentStep.Method && <StepMethod account={account} onChange={handlePaymentMethod} onChangeUserAccount={setAccount}/>}
      {step === PaymentStep.Currency && <StepCurrency method={method} onChange={handleCurrencyMethod} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Form && <StepForm account={account} currency={currency}  method={method} onSubmit={handleSubmit} onSetStep={handleSetStep}/>}
      {step === PaymentStep.Success && <StepCrypto currency={currency} method={method} response={depositResponse as IDepositCryptoResponse}/>}
    </div>
  )

  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <BottomSheetHeader className={styles.sheetHeader} title={t('withdraw_title')}  suffix={ <div className={styles.userId}>ID {context.user?.id}</div>}/>
      <BottomSheetBody className={styles.sheetBody}>
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
