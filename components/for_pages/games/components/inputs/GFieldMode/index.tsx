import styles from './index.module.scss'
import {GFieldSelectTabs} from 'components/for_pages/games/components/inputs/GFieldSelectTabs'

export enum IGameModeType {
  Manual = 'manual',
  Auto = 'auto'
}
interface Props{

}
export default function GFieldMode(props: Props) {
  const options = [
    {label: 'Мануальный', value: IGameModeType.Manual},
    {label: 'Авто', value: IGameModeType.Auto}
  ]
 return(
   <GFieldSelectTabs style={'small'} fluid className={styles.field}  name={'mode'} options={options} />
   )
 }

