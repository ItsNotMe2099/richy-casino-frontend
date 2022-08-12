import {useError} from '@stefanprobst/next-error-boundary'


export interface Props {

}

export default function CustomErrorBlock(){
  const { error, onReset } = useError()
  return (
    <div></div>
  )
}
