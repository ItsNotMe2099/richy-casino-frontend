import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
interface Props {
    delay?: number,
    values?: number[],
    number?: number,
    duration?: number,
    height: number,

}
export default function ReelsNumbers(props: Props) {
    const {
        delay, values, number, duration,
    } = props
    const [hasLoaded, setHasLoaded] = useState(false)
    const timeoutRef = useRef(null)
    useEffect(() => {
      
        timeoutRef.current = setTimeout(() => {
            setHasLoaded(true)
        }, 20)
    }, [])

    const display = (hasLoaded ? number : 0)
    const style = {
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transform: `translate(0, ${display * props.height}px)`,
    }

    return (
        <div className={styles.root} style={style}>
            {values.map((v) => <div key={v} className={styles.number}>{v}</div>)}
        </div>
    )
}

ReelsNumbers.defaultProps = {
    values: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    number: 0,
    delay: 0,
    duration: 700,
}