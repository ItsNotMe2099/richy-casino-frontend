import styles from './index.module.scss'
import { Popover } from 'react-tiny-popover'
import { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

interface Props {
  info: string
  className?: string
}



export default function QuestionPopover(props: Props) {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div className={classNames(styles.root, props.className)}>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']} // preferred positions by priority
        containerClassName={styles.popover}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={<div className={styles.info}>{props.info}</div>}
      >
      
      <div className={styles.inner} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
        <Image src='/img/icons/question.svg' width={20} height={20}/>
      </div>
    </Popover>
    </div>
  )
}
