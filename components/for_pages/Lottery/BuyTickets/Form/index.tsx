import styles from './index.module.scss'
import { Form, Formik } from 'formik'
import InputTicket from 'components/ui/Inputs/InputTicket'
import Button from 'components/ui/Button'
import cx from 'classnames'
import {useTranslation} from 'next-i18next'
import Validator from 'utils/validator'
import LotteryRepository from 'data/repositories/LotteryRepository'
import {ILotteryBuyResponse} from 'data/interfaces/ILotteryRound'
import {useState} from 'react'
import FormError from 'components/ui/Form/FormError'
interface Props {
  pricePerTicket: number,
  onBuy: (data: ILotteryBuyResponse) => void
}

export default function BuyTicketsForm(props: Props) {
  const {t} = useTranslation()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const handleBuy = async (data) => {
    setSending(true)
    setError(null)
    try {
      const res = await LotteryRepository.buyTicket(data)
      props.onBuy(res)
    }catch (e) {
      setError(e)
    }
    setSending(false)
  }

  return (
    <div className={styles.root}>
      <Formik
            initialValues={{
              tickets: '1'
            }}

            onSubmit={handleBuy}
        >
          {(formik) =>
            <Form {...formik} className={styles.form}>
              <div className={styles.block}>
              <div className={styles.top}>
                <div className={styles.number}>{t('lottery_form_num_of_tickets')}</div>
                <InputTicket className={styles.input} name='tickets' disabled={sending} placeholder={t('lottery_form_enter_num_of_tickets')} validate={Validator.required}/>
              </div>
              <div className={styles.bottom}>
                <div className={cx(styles.total, styles.price)}>
                  <div className={styles.text}>
                    {t('lottery_form_price_per_ticket')}
                  </div>
                  <div className={styles.digits}>
                    {props.pricePerTicket.toFixed(8)} BTC
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.text}>
                    {t('lottery_form_total_amounts')}
                  </div>
                  <div className={styles.digits}>
                    {(parseInt(formik.values.tickets, 10) > 0 ? parseInt(formik.values.tickets, 10) * props.pricePerTicket : props.pricePerTicket).toFixed(8)} BTC
                  </div>
                </div>
              </div>
              </div>
              <FormError error={error}/>
                <Button className={styles.btn} spinner={sending} size='large' background='blueGradient500' type='submit'>{t('lottery_form_buy_ticket')}</Button>
            </Form>}
        </Formik>
    </div>
  )
}

