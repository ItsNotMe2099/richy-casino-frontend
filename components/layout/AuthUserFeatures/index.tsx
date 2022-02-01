import { useAppContext } from 'context/state'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import UserFooter from 'components/for_pages/Common/UserFooter'
import styles from './index.module.scss'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {}

export default function AuthUserFeatures(props: Props) {

  const context = useAppContext()

  const user = context.auth

  return (
    <>
    {(user && context.showBonus && context.showBonusExpanded) &&
      <>
        <div className={styles.longDown}>
          <HiddenXs>
            <BonusSlide style='footer' onRequestClose={() => context.setBonusExpanded(false)}/>
          </HiddenXs>
          <VisibleXs>
            <BonusSmallBanner style='footer' timer onRequestClose={() => context.setBonusExpanded(false)}/>
          </VisibleXs>
        </div>
      </>
    }
    {context.auth && <VisibleXs>
      <UserFooter/>
    </VisibleXs>
    }
    </>
  )
}

