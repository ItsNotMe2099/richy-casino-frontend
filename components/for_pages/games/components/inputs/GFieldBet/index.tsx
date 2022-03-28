import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'
import Validator from 'utils/validator'
import {useGameContext} from 'components/for_pages/games/context/state'

interface Props{
}
export default function GFieldBet(props: Props) {
  const gameContext = useGameContext()
 return   <GField  name={'bet'} label={'Сумма'} type={'number'} labelSuffix={`${gameContext.user?.balance ? `${gameContext.user?.balance} ${gameContext.user?.currency?.toUpperCase()}` : ''}`} prefix={gameContext.user?.currency?.toUpperCase() || ''} suffix={'arrow'} validate={Validator.required} inputClassName={styles.input} {...props}/>
}

