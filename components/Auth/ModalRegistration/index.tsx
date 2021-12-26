import styles from './index.module.scss'
import Modal from '../../ui/Modal'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, FormikProvider, useFormik} from 'formik'
import {required} from 'utils/validations'
import InputPassword from 'components/ui/Inputs/InputPassword'
import classNames from 'classnames'
import InputPhone from 'components/ui/Inputs/InputPhone'
import { Select } from 'components/ui/Inputs/Select'
import PromoCode from 'components/for_pages/Common/Promocode'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import Link from 'next/link'
import ShortBanner from 'components/for_pages/Common/ShortBanner'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import Input from 'components/ui/Inputs/Input'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalRegistration(props: Props) {

  const [variant, setVariant] = useState('Телефон')


  const handleSubmit = async (data) => {
    
  }

  const Variant = (prop: {logo: string, label: string}) => {
    return(
    <div className={classNames(styles.variant, {[styles.active]: variant === prop.label })} onClick={() => setVariant(prop.label)}>
      <img src={prop.logo} alt=''/>
      <div className={classNames(styles.label, {[styles.mobile]: variant === prop.label })}>
        {prop.label}
      </div>
    </div>
    )
  }

  const variants = [
    {logo: '/img/Auth/mail.svg', label: 'Быстрая'},
    {logo: '/img/Auth/phone.svg', label: 'Телефон'},
    {logo: '/img/Auth/chat.svg', label: 'Соц. сети'},
  ]

  const items = [
    {label: 'Российский рубль (RUB)', value: 'Российский рубль (RUB)', icon: '/img/icons/rub.svg'},
    {label: 'Российский рубль (RUB)', value: 'Российский рубль (RUB)', icon: '/img/icons/rub.svg'},
    {label: 'Российский рубль (RU)', value: 'Российский рубль (RU)', icon: '/img/icons/rub.svg'},
  ]

  const formik = useFormik({
    initialValues: {
      phone: null,
      email: null,
      password: null,
      currency: 'Российский рубль (RUB)',
      checkBox: false
    },

    onSubmit: handleSubmit
  })

  const socials = [
    {image: '/img/Auth/G+.svg'},
    {image: '/img/Auth/ok.svg'},
    {image: '/img/Auth/vk.svg'},
    {image: '/img/Auth/ya.svg'},
    {image: '/img/Auth/telegram.svg'},
    {image: '/img/Auth/mailRu.svg'},
    {image: '/img/Auth/steam.svg'},
  ]


  const { t } = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Modal {...props} title='Регистрация'>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <ShortBanner/>
          <div className={styles.variants}>
            {variants.map((item, index) =>
              <Variant label={item.label} logo={item.logo} key={index}/>
            )}
          </div>
          <div className={styles.inputs}>
            {
              variant === 'Соц. сети' &&
              <>
              <HiddenXs>
              <div className={styles.socials}>
                {socials.map((item, index) => 
                <Link href='#' key={index}>
                  <a>
                    <img src={item.image} alt=''/>
                  </a>
                </Link>
                )}
              </div>
            </HiddenXs>
            <VisibleXs>
              <>
              <div className={styles.socials}>
                {socials.slice(0, 4).map((item, index) => 
                <Link href='#' key={index}>
                  <a>
                    <img src={item.image} alt=''/>
                  </a>
                </Link>
                )}
              </div>
              <div className={styles.socials}>
              {socials.slice(4, socials.length).map((item, index) => 
                <Link href='#' key={index}>
                  <a>
                    <img src={item.image} alt=''/>
                  </a>
                </Link>
                )}
              </div>
              </>
            </VisibleXs>
            </>
            }
            <Select name='currency' options={items}/> 
            {(variant === 'Телефон' || variant === 'Быстрая') &&
              <>
             {variant === 'Телефон' && <InputPhone className={styles.phone} name={'phone'} placeholder={'Номер телефона'} validate={required} />}
             {variant === 'Быстрая' && <Input className={styles.email} name={'email'} placeholder={'Электронный адрес'} validate={required} />}
             <InputPassword name={'password'} placeholder={'Придумайте пароль'} validate={required}/>
             </>
            }
            <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
               {promoCode ? <div className={styles.plus}>-</div> : <div className={styles.plus}>+</div>}
               <span>У меня есть промокод</span>
             </div>
             {promoCode &&
              <PromoCode/>
             }
             <CheckBox name='checkBox' label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет'/>
          </div>
          <Button type='submit' className={styles.button} size='play' background='blueGradient500'>Регистрация</Button>
          <div className={styles.login}>
            Уже есть аккаунт? <span>Войдите</span>
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
