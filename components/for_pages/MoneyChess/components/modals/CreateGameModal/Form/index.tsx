import Button from 'components/ui/Button'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from 'components/for_pages/MoneyChess/components/modals/CreateGameModal/Form/index.module.scss'
import Validator from 'utils/validator'
import {convertCurrencyToOptionsExchange} from 'utils/converter'
import { useAppContext } from 'context/state'
import { CreateGameOptions } from 'components/for_pages/MoneyChess/ui/Inputs/CreateGameOptions'
import { useState } from 'react'
import GField from 'components/for_pages/games/components/inputs/GField'
import {CurrencySelectSuffixField} from 'components/ui/Inputs/CurrencySelectSuffixField'
import {IChessGameCreateFormData} from 'components/for_pages/MoneyChess/data/types'
import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import {getObjectFromChessGameTypeStr} from 'components/for_pages/MoneyChess/utils/chess'


interface Props {
  onSubmit?: () => void
  onRequestClose?: () => void
}

export default function CreateGameForm(props: Props) {

  const context = useAppContext()
  const currencies = convertCurrencyToOptionsExchange(context.currencies ?? [])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const gameTypes = [
    {icon: '/img/Chess/game-type.svg', label: '×2', value: ChessGameType.Classic}
  ]

  const times = [
    {label: '10 мин + 5 сек', value: '600:5'},
    {label: '10 мин + 10 сек', value: '600:10'},
    {label: '10 мин + 15 сек', value: '600:15'},
  ].map(i => ({
    ...i,
    icon: '/img/Chess/clock.svg',
  }))

  const initialValues: IChessGameCreateFormData = {
    betAmount: null,
    currency: currencies[0]?.value,
    time: times[0].value,
    gameType: gameTypes[0].value
  }

  const handleSubmit = async (data) => {
    console.log('game created', data)
    setSending(true)
    try{
      const game = await ChessGameRepository.create({...data, ...getObjectFromChessGameTypeStr(data.time)})
      console.log('game created', game)
    }catch (e){
      console.error(e)
      setError(e)
    }
    setSending(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const {values, setFieldValue, handleChange} = formik
  const [currentItem, setCurrentItem] = useState(currencies.filter(item => item.value === values.currency))


  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
          <div className={styles.inputs}>
            <GField name={'betAmount'} label={'Ставка'} inputClassName={styles.input} inputWrapperClassName={styles.inputWrapper} validate={Validator.required} suffix={   <CurrencySelectSuffixField className={styles.exchange} name='currency' options={currencies}/>}/>
          </div>
          <div className={styles.settings}>
            <CreateGameOptions name='time' label={'Время'} options={times} validate={Validator.required}/>
            <CreateGameOptions name='gameType' disabled label={'Тип игры'} options={gameTypes} validate={Validator.required}/>
            </div>

          <div className={styles.btnsWrapper}>
            <Button size='normal' className={styles.button} fluid disabled={sending}  onClick={props.onRequestClose}  background='dark500'>Отмена</Button>
            <Button  size='normal'  className={styles.button} fluid disabled={sending}  type='submit'  background='blueGradient500'>Начать играть</Button>
          </div>
      </Form>
    </FormikProvider>
  )
}
