import {useAppContext} from 'context/state'
import UserFooter from 'components/for_pages/Common/UserFooter'
import styles from './index.module.scss'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {BonusDepositShowMode} from 'types/enums'
import BonusFooter from 'components/for_pages/Common/BonusFooter'
import { useRouter } from 'next/router'

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
    {( context.showBonus && context.bonusShowMode === BonusDepositShowMode.Spoiler) &&
      <>
        <div className={styles.longDown}>
          <HiddenXs>
            <BonusFooter style='footer' onRequestClose={() => context.setBonusShowMode(BonusDepositShowMode.Gift)}/>
          </HiddenXs>
          <VisibleXs>
            <BonusSmallBanner style='footer' onRequestClose={() => context.setBonusShowMode(BonusDepositShowMode.Gift)}/>
          </VisibleXs>
        </div>
      </>
    }
     <VisibleXs>
      <UserFooter/>
    </VisibleXs>

    </>
  )
}

