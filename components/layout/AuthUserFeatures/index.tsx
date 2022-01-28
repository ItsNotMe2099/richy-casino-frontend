import { useAppContext } from 'context/state'
import ConstantSlide from 'components/for_pages/Common/ConstantSlide'
import UserFooter from 'components/for_pages/Common/UserFooter'
import styles from './index.module.scss'
import ShortBanner from 'components/for_pages/Common/ShortBanner'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {}

export default function AuthUserFeatures(props: Props) {

  const context = useAppContext()

  const user = true//context.auth

  return (
    <>
    {(user && context.banner) &&
      <>
        <div className={styles.longDown}>
          <HiddenXs>
            <ConstantSlide longDown onRequestClose={context.hideBanner}/>
          </HiddenXs>
          <VisibleXs>
            <ShortBanner authBanner reverse timer longDown onRequestClose={context.hideBanner}/>
          </VisibleXs>
        </div>
      </>
    }
    {user &&
      <UserFooter/>
    }
    </>
  )
}

