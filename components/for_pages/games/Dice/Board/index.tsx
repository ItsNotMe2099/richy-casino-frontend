import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {GDiceProgressBar} from 'components/for_pages/games/Dice/components/ProgressBar'
import {Form, Formik} from 'formik'
import {useState} from 'react'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldChance from 'components/for_pages/games/Dice/components/GFieldChance'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'

interface Props{

}
export default function Board(props: Props) {
  const [roll, setRoll] = useState(2)
  const handleClick = (key) => {
    console.log(key)
  }

  const handleSubmit = (date) => {

  }
  const initialValues = {

  }
  return (
    <GamePageBoardLayout>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.root}>
          <div className={styles.diceContainer}>
            <div className='dice' style={{ backgroundImage: 'url()' }} />
          </div>
              <GDiceProgressBar className={styles.progressBar} limit={100}  state={'up'} name={'progress'} onChange={(val) => setRoll(val)}/>
              <div className={styles.fields}>
                <div className={styles.subFields}>
                <GField name={'cachback'} label={'Сумма'} suffix={'clear'}/>
                <GField name={'roll'} className={styles.fieldRoll} label={'Сумма'} suffix={<img className={styles.exchangeSuffix} src={'/img/Games/exchange.svg'}/>}/>
                </div>
                <GFieldChance name={'chance'}  className={styles.fieldChance} label={'Шанс выиграть'} min={10} max={60}/>
              </div>
          <GameImageGround/>
        </Form>
      </Formik>
    </GamePageBoardLayout>
  )
}


