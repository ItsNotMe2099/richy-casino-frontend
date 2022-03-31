import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import {convertCurrencyToOptionsExchange} from 'utils/converter'
import { useAppContext } from 'context/state'
import { ExchangeCurrencySelectField } from 'components/ui/Inputs/ExchangeCurrencySelectField'
import { CreateGameOptions } from 'components/for_pages/MoneyChess/ui/Inputs/CreateGameOptions'


interface Props {
  onSubmit?: () => void
  onRequestClose?: () => void
}

export default function CreateGameForm(props: Props) {

  const context = useAppContext()

  const gameTypes = [
    {icon: '/img/Chess/game-type.svg', label: '×2', value: 'game'},
    {icon: '/img/Chess/game-type.svg', label: '×3', value: 'game'},
    {icon: '/img/Chess/game-type.svg', label: '×2', value: 'game'},
  ]

  const times = [
    {icon: '/img/Chess/clock.svg', label: '10 мин + 5 сек', value: 'time'},
    {icon: '/img/Chess/clock.svg', label: '10 мин + 10 сек', value: 'time'},
    {icon: '/img/Chess/clock.svg', label: '10 мин + 10 сек', value: 'time'},
  ]

  const initialValues = {
    amount: '',
    currency: convertCurrencyToOptionsExchange(context.currencies)[0].label,
    time: times[0].value,
    type: gameTypes[0].value
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const {values, setFieldValue, handleChange} = formik

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.youSend}>
              Ставка
            </div>
          </div>
          <div className={styles.inputs}>
            <InputField name={'amount'} className={styles.input} validate={Validator.required}/>
            <ExchangeCurrencySelectField className={styles.exchange} name='currency' options={convertCurrencyToOptionsExchange(context.currencies)} initial={initialValues.currency}/>
          </div>
          <div className={styles.settings}>
            <div className={styles.option}>
            <div className={styles.createGameSelect}>
              <div>
              <div className={styles.texts}>
              <div className={styles.youSend}>
                Время
              </div>
            </div>
              <div className={styles.time}>
              <CreateGameOptions name='time' options={times} initial={initialValues.time}/>
              </div>
              </div>
              </div>
            </div>
            <div className={styles.option}>
            <div className={styles.createGameSelect}>
            <div className={styles.texts}>
              <div className={styles.youSend}>
                Тип игры
              </div>
            </div>
            <div className={styles.time}>
              <CreateGameOptions name='type' options={gameTypes} initial={initialValues.type}/>
            </div>
            </div>
            </div>
            </div>
          </div>
          <div className={styles.btnsWrapper}>
          <div className={styles.btns}>
          <Button onClick={props.onRequestClose} background='dark500' className={styles.cancel}>Отмена</Button>
          <Button type='submit' background='blueGradient500' className={styles.begin}>Начать играть</Button>
          </div>
          </div>
      </Form>
    </FormikProvider>
  )
}
