import styles from './index.module.scss'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {useAppContext} from 'context/state'
import Formatter from 'utils/formatter'
import {useState} from 'react'
import {ProfileModalType} from 'types/enums'
import FormError from 'components/ui/Form/FormError'
import {ConfirmNewPhoneModalArguments, ConfirmOldPhoneModalArguments} from 'types/interfaces'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import UserRepository from 'data/repositories/UserRepository'
import {useTranslation} from 'next-i18next'

interface Props {
  isBottomSheet?: boolean
}

export default function ModalConfirmOldPhone(props: Props) {
  const context = useAppContext()
  const args = context.modalArguments as ConfirmOldPhoneModalArguments

  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)

  const handleSubmit = async (data) => {
    try {
      setSending(true)
      setError(null)
      const res = await UserRepository.confirmOldPhone({
        code:  data.code,
        phone: Formatter.cleanPhone(args.phone),
      })

      setSending(false)
      if(args.shouldConfirmNewPhone){
        context.goBackModalProfile()
        context.showModalProfile(ProfileModalType.newPhoneConfirm, {phone: res.newPhone} as ConfirmNewPhoneModalArguments, true)
      }else{
        context.goBackModalProfile()
      }

    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const initialValues = {
    code: '',
  }


  const { t } = useTranslation()

  const result = (<Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({values}) => (
      <Form className={styles.form}>
        <div className={styles.description}>
          {t('phone_old_confirm_text_1')} <span className={styles.code}> {t('phone_old_confirm_text_2')}</span> {t('phone_old_confirm_text_3')}&nbsp;
          {t('phone_old_confirm_text4')} <span className={styles.phone}> {Formatter.formatPhone(args.phone)}</span>
        </div>
        <div className={styles.inputs}>
          <InputField
            name={'code'}
            disabled={sending}
            placeholder={t('phone_old_confirm_field_code')} validate={Validator.required}/>
        </div>
        <FormError error={error}/>
        <Button type='submit' fluid spinner={sending} className={styles.button} size='submit' background='blueGradient500' >{t('phone_old_confirm_button')}</Button>

      </Form>)}
  </Formik>)
  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('phone_old_confirm_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('phone_old_confirm_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
