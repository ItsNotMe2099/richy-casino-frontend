import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import {useTranslation} from 'next-i18next'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import GameIFrameHeader from './GameIFrameHeader'
import IframeResizer from 'iframe-resizer-react'
import useScreenOrientation from 'components/hooks/screen-orientation'

interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
  game: IGame
}

export default function GameIframeRichy(props: Props) {
  const appContext = useAppContext()
  const screenOrientation = useScreenOrientation()
  const {t, i18n} = useTranslation()
  return (
    <div className={classNames(styles.root, {
      [styles.orientationLeftTop]: appContext.isMobile && screenOrientation === 'landscape-primary',
      [styles.orientationRightTop]: appContext.isMobile && screenOrientation === 'landscape-secondary',

      [styles.mobile]: appContext.isMobile})}>
     {!appContext.isMobile && <GameIFrameHeader  title={props.game.name} icon={props.game.imageIconSmallUrl ?? props.game.imageIconPreviewUrl}/>}
      <div className={styles.board}>
        {props.session && (appContext.isMobile ?
          <div className={styles.iframeWrapper}> <iframe
            src={`${props.session.gameUrl}&lang=${i18n.language}`}
            className={styles.iframe}
            style={{ width: '100%', minWidth: '100%'}}
          /></div>: <IframeResizer
            log
            autoResize={!appContext.isMobile}
            className={styles.iframe}
            heightCalculationMethod="bodyScroll"
            src={`${props.session.gameUrl}&lang=${i18n.language}`}
            style={{ width: '1px', minWidth: '100%'}}
          />)}
        {!props.session && <div className={styles.error}>{t('game_error_unavailable')}</div>}

      </div>

    </div>
  )
}
