import styles from './index.module.scss'
import { Form, Formik } from 'formik'
import InputTicket from 'components/ui/Inputs/InputTicket'
import Button from 'components/ui/Button'
import cx from 'classnames'
import {useTranslation} from 'next-i18next'
interface Props {

}

export default function BuyTicketsForm(props: Props) {
  const {t} = useTranslation()
  const handleBuy = async (data) => {

  }

  return (
    <div className={styles.root}>
      <Formik
            initialValues={{
              phone: null
            }}

            onSubmit={handleBuy}
        >
          {(formik) =>
            <Form {...formik} className={styles.form}>
              <div className={styles.block}>
              <div className={styles.top}>
                <div className={styles.number}>{t('lottery_form_num_of_tickets')}</div>
                <InputTicket className={styles.input} name='ticket' placeholder={t('lottery_form_enter_num_of_tickets')}/>
              </div>
              <div className={styles.bottom}>
                <div className={cx(styles.total, styles.price)}>
                  <div className={styles.text}>
                    {t('lottery_form_price_per_ticket')}
                  </div>
                  <div className={styles.digits}>
                    0.00000001 BTC
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.text}>
                    {t('lottery_form_total_amounts')}
                  </div>
                  <div className={styles.digits}>
                    0.00000001 BTC
                  </div>
                </div>
              </div>
              </div>
                <Button className={styles.btn} size='large' background='blueGradient500' type='submit'>{t('lottery_form_buy_ticket')}</Button>
            </Form>}
        </Formik>
    </div>
  )
}

