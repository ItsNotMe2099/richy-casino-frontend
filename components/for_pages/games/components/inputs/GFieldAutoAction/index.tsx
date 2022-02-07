import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'
import {GFieldSelectTabs} from 'components/for_pages/games/components/inputs/GFieldSelectTabs'
import { useFormikContext} from 'formik'
export enum IGameAutoActionType{
  Reset = 'reset',
  IncreaseBy = 'increaseBy'
}
interface Props{
  typeName: string
  valueName: string
}
export default function GFieldAutoAction({typeName, valueName}:Props) {
  const formik = useFormikContext()
  console.log('Formik', formik)
  const options = [
    {label: 'Reset', value: IGameAutoActionType.Reset},
    {label: 'Increase by', value: IGameAutoActionType.IncreaseBy},
  ]
 return(<div className={styles.root}>

   <GFieldSelectTabs className={styles.tabs}  name={typeName} label={'On Win'} options={options} />

   <GField  name={valueName} disabled={formik.values[typeName] === IGameAutoActionType.Reset} suffix={<div className={styles.percent}>%</div>} inputClassName={styles.input} className={styles.field} />

  </div>)
 }

