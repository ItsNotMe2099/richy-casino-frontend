import {Form, Formik} from 'formik'
import styles from 'components/Auth/ModalLogin/index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import GFieldBetAmount from 'components/for_pages/games/components/inputs/GFieldBetAmount'
import GFieldAutoAction from 'components/for_pages/games/components/inputs/GFieldAutoAction'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
interface Props{

}
export default function FormManual(props: Props) {

  const handleSubmit = (data) => {

  }
  const initialValues = {
    bet: null,
    betAmount: null,
    onWinType: null,
    onWinValue: null,
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <GFieldBet balance={'0.0s0ds0d0sd BTC'}/>
        <GFieldBetAmount name={'betAmount'}/>
        <GFieldAutoAction typeName={'onWinType'} valueName={'onWinValue'}/>
        <GField name={'ewe'} label={'Сумма'} labelSuffix={'0.0s0ds0d0sd BTC'} suffix={'clear'}/>
        <CheckBox size={'normal'} name={'stopOnWin'} label={'Stop on win'}/>
      </Form>
    </Formik>
  )
}


