import { useAppContext } from 'context/state'
interface Props {
  children: JSX.Element
}
export default function VisibleXs(props: Props): JSX.Element | null {
  const appContext = useAppContext()
  console.log('CheckMobile11', appContext.isMobile)
  if (appContext.isMobile) {
    return props.children
  }
  return null
}
