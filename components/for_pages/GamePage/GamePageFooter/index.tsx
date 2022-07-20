import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { useTranslation } from 'next-i18next'
import Button from 'components/ui/Button'
import { ModalType, ProfileModalType } from 'types/enums'
import GameHeaderBurgerSvg from 'components/svg/GameHeaderBurgerSvg'
import GameHeaderArrowSvg from 'components/svg/GameHeaderBurgerSvg copy'
import { useRouter } from 'next/router'
import UserUtils from 'utils/user'

interface Props {

}

export default function GamePageFooter(props: Props) {
  const { t } = useTranslation()
  const context = useAppContext()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  const handleMenuClick = () => {
    context.showModal(ModalType.profileBurger)
  }
  const mainAccount = UserUtils.getMainBalanceTotals(context.user)

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.arrow} onClick={handleBack}>
        <GameHeaderArrowSvg />
        </div>

      </div>
      {context.user && <div className={styles.balance}>
          {mainAccount.value} <span className={styles.currency}>
            {mainAccount.currency}</span>
      </div>}
      <Button background='payGradient500' className={styles.deposit}
        onClick={() => context.showModalProfile(ProfileModalType.wallet)}>{t('profile_deposit')}</Button>
      <div className={styles.menu} onClick={handleMenuClick}><GameHeaderBurgerSvg /></div>

    </div>
  )
}

