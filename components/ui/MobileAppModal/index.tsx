import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import {useTranslation} from 'next-i18next'

interface Props {
  isBottomSheet?: boolean
}

export default function MobileAppModal(props: Props) {
  const {t} = useTranslation()

  const context = useAppContext()

  const steps = [
    {title: t('pwa-instruction_label_step_1'), desc: t('pwa-instruction_desc_step_1')},
    {title: t('pwa-instruction_label_step_2'), desc: t('pwa-instruction_desc_step_2')},
    {title: t('pwa-instruction_label_step_3'), desc: t('pwa-instruction_desc_step_3')},
  ]

  const result = (
    <div className={styles.text}>{t('mobile_app_desktop_text')}</div>
  )



  const resultMobile = (
    <div className={styles.root}>
      <div className={styles.instruction}>
        <div className={styles.instructionTitle}>
          {t('pwa-instruction_title_ios')}
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) =>
            <div className={styles.step} key={index}>
              <div className={styles.count}></div>
              <div>
                <div className={styles.stepTitle}>
                  {step.title}
                </div>
                <div className={styles.stepText}>
                  {step.desc}
                </div>
              </div>
            </div>
          )}
        </div>
        {/*<img className={styles.video} src='/gifs/ios.gif'/>*/}
      </div>
    </div>
  )

  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetBody>
        {resultMobile}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={''}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
