import {useAppContext} from 'context/state'
import UserFooter from 'components/for_pages/Common/UserFooter'
import styles from './index.module.scss'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {BonusDepositShowMode, ModalType} from 'types/enums'
import BonusFooter from 'components/for_pages/Common/BonusFooter'
import {useRouter} from 'next/router'
import Gift from 'components/for_pages/Common/Gift'
import BonusFooterMobile from 'components/for_pages/Common/BonusFooterMobile'
import {Routes} from 'types/routes'

interface Props {}

export default function AuthUserFeatures(props: Props) {
  const context = useAppContext()
  const router = useRouter()
  const user = context.auth
  if(router.pathname === '/game/[id]'){
    return null
  }
  return (
    <>
    {( context.showBonus && context.bonusShowMode === BonusDepositShowMode.Spoiler && router.pathname !== Routes.sport) &&
      <>
        <div className={styles.longDown}>
          <HiddenXs>
            <BonusFooter style='footer' onRequestClose={() => context.setBonusShowMode(BonusDepositShowMode.Gift)}/>
          </HiddenXs>
          <VisibleXs>
           <BonusFooterMobile onRequestClose={() => context.setBonusShowMode(BonusDepositShowMode.Gift)}/>
           </VisibleXs>
        </div>
      </>
    }
    {(context.showBonus && (context.bonusShowMode === BonusDepositShowMode.Gift || (router.pathname === Routes.sport && context.bonusShowMode === BonusDepositShowMode.Spoiler)) && context.modal !== ModalType.bonus && context.bottomSheet !== ModalType.bonus) && <div className={styles.bonus}><Gift timer/></div>}
     <VisibleXs>
      <UserFooter/>
    </VisibleXs>

    </>
  )
}

