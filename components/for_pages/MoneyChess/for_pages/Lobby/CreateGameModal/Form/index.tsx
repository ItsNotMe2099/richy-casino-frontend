import Button from 'components/ui/Button'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/CreateGameModal/Form/index.module.scss'
import Validator from 'utils/validator'
import Converter from 'utils/converter'
import { useAppContext } from 'context/state'
import { CreateGameOptions } from 'components/for_pages/MoneyChess/ui/Inputs/CreateGameOptions'
import { useState } from 'react'
import GField from 'components/for_pages/games/components/inputs/GField'
import {CurrencySelectSuffixField} from 'components/ui/Inputs/CurrencySelectSuffixField'
import {IChessGameCreateFormData} from 'components/for_pages/MoneyChess/data/types'
import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import {getObjectFromChessGameTypeStr} from 'components/for_pages/MoneyChess/utils/chess'
import {ChessGameTimesList} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {
  getChessGameTimeName,
  getChessGameTimeIcon,
  getChessGameTypeName, getChessGameTypeIcon
} from 'components/for_pages/MoneyChess/types/factories'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import FormError from 'components/ui/Form/FormError'


interface Props {
  onSubmit?: () => void
  onRequestClose?: () => void
}

export default function CreateGameForm(props: Props) {

  const context = useAppContext()
  const lobbyContext = useChessGameLobbyContext()
  const currencies = Converter.convertCurrencyToOptionsExchange(context.currencies ?? [])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const gameTypes = [ChessGameType.Classic].map(i => ({label: getChessGameTypeName(i), value: i, icon: getChessGameTypeIcon(i)}))

  const times = ChessGameTimesList.map(i=> ({
    label: getChessGameTimeName(`${i.lifetime}:${i.increaseTime}`),
    value: `${i.lifetime}:${i.increaseTime}`,
    icon: getChessGameTimeIcon({timeKey: `${i.lifetime}:${i.increaseTime}`, times: ChessGameTimesList})
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
    setError(null)
    try{
      const game = await ChessGameRepository.create({...data, ...getObjectFromChessGameTypeStr(data.time)})
      console.log('game created', game)
      lobbyContext.hideModal()
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
          <FormError error={error}/>
          <div className={styles.btnsWrapper}>
            <Button size='normal' className={styles.button} fluid disabled={sending}  onClick={props.onRequestClose}  background='dark500'>Отмена</Button>
            <Button  size='normal'  className={styles.button} fluid disabled={sending}  type='submit'  background='blueGradient500'>Начать играть</Button>
          </div>
      </Form>
    </FormikProvider>
  )
}
