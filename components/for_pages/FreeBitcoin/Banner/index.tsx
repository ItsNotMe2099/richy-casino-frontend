import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  className?: string
  state: string
  coins: string
}

export default function Banner(props: Props) {

  const Digit = (prop: {digit: string}) => {
    return (
      <div className={styles.digit}>
        {prop.digit}
      </div>
    )
  }

  const chars = []

  for(let char of props.coins){
    chars.push(char)
  }

  const someDate = '2021-12-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)
  
  return (
    <div className={styles.root}>
      <div className={styles.amount}>
        {chars.slice((chars.length - 5), chars.length).map((item, index) =>
          <Digit digit={item} key={index}/>
        )}
      </div>
      {props.state === 'play' && 
        <Button className={styles.btn} size='huge' background='blueGradient500'>PLAY NOW</Button>
      }
      {props.state === 'win' && 
        <div className={styles.win}>
          <div className={styles.you}>YOU WIN</div>
          <div className={styles.btns}>
            <div className={styles.coins}>
              <img src='/img/FreeBitcoin/bitcoin.svg' alt=''/>
              <div>{props.coins}</div>
            </div>
            <div className={styles.ticket}>
              <img src='/img/FreeBitcoin/ticket.svg' alt=''/>
              <div>2 free lottery ticket</div>
            </div>
          </div>
        </div>
      }
      {props.state === 'timer' &&
        <div className={styles.timer}>
          <Timer expiredAt={expiredAt}/>
          <div className={styles.again}>
            Before you can play free again
          </div>
        </div>
      }
    </div>
  )
}

