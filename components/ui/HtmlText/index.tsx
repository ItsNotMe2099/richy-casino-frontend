import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children: string
  className?: string
}

export default function HtmlText(props: Props) {
  return (
    <div className={classNames([styles.root, props.className])} dangerouslySetInnerHTML={{ __html: props.children }}/>
  )
}

