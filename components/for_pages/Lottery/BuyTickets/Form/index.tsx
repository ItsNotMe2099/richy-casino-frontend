import styles from './index.module.scss'
import { Form, Formik } from 'formik'
import InputTicket from 'components/ui/Inputs/InputTicket'
import Button from 'components/ui/Button'

interface Props {
  
}

export default function BuyTicketsForm(props: Props) {

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
                <div className={styles.number}>No. for tickets</div>
                <InputTicket className={styles.input} name='ticket' placeholder='Enter no. of ticket'/>
              </div>
              <div className={styles.bottom}>
                <div className={styles.price}>
                  <div className={styles.text}>
                    Price per ticket
                  </div>
                  <div className={styles.digits}>
                    0.00000001 BTC
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.text}>
                    Total amount
                  </div>
                  <div className={styles.digits}>
                    0.00000001 BTC
                  </div>
                </div>
              </div>
              </div>
                <Button className={styles.btn} size='large' background='blueGradient500' type='submit'>BUY TICKET</Button>
            </Form>}
        </Formik>
    </div>
  )
}

