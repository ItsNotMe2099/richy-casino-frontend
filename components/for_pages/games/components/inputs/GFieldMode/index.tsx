import styles from './index.module.scss'
import {GFieldSelectTabs} from 'components/for_pages/games/components/inputs/GFieldSelectTabs'

export enum CasinoGameModeType {
  Manual = 'manual',
  Auto = 'auto'
}
interface Props{

}
export default function GFieldMode(props: Props) {
  const options = [
    {label: 'Мануальный', value: CasinoGameModeType.Manual},
    {label: 'Авто', value: CasinoGameModeType.Auto}
  ]
 return(
   <GFieldSelectTabs style={'small'} fluid className={styles.field}  name={'gameMode'} options={options} />
   )
 }

