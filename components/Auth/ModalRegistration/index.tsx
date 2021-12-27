import styles from './index.module.scss'
import Modal from '../../ui/Modal'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import classNames from 'classnames'
import { Select } from 'components/ui/Inputs/Select'
import PromoCode from 'components/for_pages/Common/Promocode'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import ShortBanner from 'components/for_pages/Common/ShortBanner'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import SocialButtons from 'components/Auth/SocialButtons'
import {useModal} from 'store/modal-store'
import {ModalType} from 'types/enums'

enum TabType{
  Email,
  Phone,
  Socials
}
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}
interface TabProps{
  logo: string,
  label: string,
  tab: TabType,
  isActive: boolean
  onSelect: (tab) => void
}
const Tab = ({logo, label, tab, isActive, onSelect}: TabProps) => {

  return(
    <div className={classNames(styles.variant, {[styles.active]: isActive })} onClick={onSelect}>
      <img src={logo} alt=''/>
      <div className={classNames(styles.label, {[styles.mobile]: isActive })}>
        {label}
      </div>
    </div>
  )
}

export default function ModalRegistration(props: Props) {

  const {open} = useModal()
  const [variant, setVariant] = useState<TabType>(TabType.Phone)


  const handleSubmit = async (data) => {
    open(ModalType.passwordReset, data)
  }



  const variants = [
    {logo: '/img/Auth/mail.svg', label: 'Быстрая', tab: TabType.Email},
    {logo: '/img/Auth/phone.svg', label: 'Телефон', tab: TabType.Phone},
    {logo: '/img/Auth/chat.svg', label: 'Соц. сети', tab: TabType.Socials},
  ]

  const items = [
    {label: 'Российский рубль (RUB)', value: 'Российский рубль (RUB)', icon: '/img/icons/rub.svg'},
    {label: 'Российский рубль (RUB)', value: 'Российский рубль (RUB)', icon: '/img/icons/rub.svg'},
    {label: 'Российский рубль (RU)', value: 'Российский рубль (RU)', icon: '/img/icons/rub.svg'},
  ]

  const initialValues = {
      phone: null,
      email: null,
      password: null,
      currency: 'Российский рубль (RUB)',
      checkBox: false
    }



  const { t } = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Modal {...props} title='Регистрация'>
      <ShortBanner/>
      <div className={styles.variants}>
        {variants.map((item, index) =>
          <Tab label={item.label} logo={item.logo} key={index} tab={item.tab} isActive={variant === item.tab} onSelect={() => setVariant(item.tab)}/>
        )}
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          {variant === TabType.Socials && <SocialButtons/>}

          <div className={styles.inputs}>
             <Select name='currency' options={items}/>
            {variant === TabType.Phone &&  <InputField format={'phone'} name={'phone'} placeholder={'Номер телефона'} validate={Validator.required} />}
            {variant === TabType.Email &&  <InputField name={'email'} placeholder={'Электронный адрес'} validate={Validator.combine([Validator.required, Validator.email])} />}
            {(variant === TabType.Phone || variant === TabType.Email) && <InputField name={'password'} type={'password'} obscure={true} placeholder={'Придумайте пароль'} validate={Validator.required}/>}

            <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
              <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
               <span>У меня есть промокод</span>
             </div>
             {promoCode &&
              <PromoCode/>
             }
             <CheckBox name='checkBox' label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет'/>
          </div>
          <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>Регистрация</Button>
          <div className={styles.login}>
            Уже есть аккаунт? <span>Войдите</span>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
