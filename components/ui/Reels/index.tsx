import React, { useEffect, useState } from 'react'
import ReelsNumbers from './ReelNumber'
import styles from './index.module.scss'
const TYPE_STRING = 'string'
const TYPE_INT = 'integer'
const TYPE_FRACTION = 'fraction'
interface IPart{
    type: string,
    value: number
}
const getNumbers = (number: number) => {
    return number.toString().split('').map((n) => parseInt(n, 10))
}
const stripNonNumbers = (str: string) => str && (str.match(/\d/g) || []).join('')
const getParts = (text: string): IPart[] => {
    const parts = []
    let lastType = null
    for (let i = 0; i < text.length; i++) {
        const isInt = !isNaN(parseInt(text[i], 10))
        const type = isInt ? TYPE_INT : TYPE_STRING
        const isSame = (lastType === TYPE_INT && isInt) || (lastType === TYPE_STRING && !isInt)
        if (isSame) {
            parts[parts.length - 1].value += text[i]
        } else {
            parts.push({ type, value: text[i] })
        }
        lastType = type
    }
    return parts
}
const delay = (index: number, delayArray: number[], delay: number) => {
    if (!delayArray) {
        return 0
    }
    const indexDelay = delayArray.indexOf(index)
    return (indexDelay > -1 ? (indexDelay + 1) : 0) * delay
}
interface Props {
    text: string
    duration?: number,
    delay?: number,

}
export default function Reels(props: Props) {
    const [text, setText] = useState<string>('')
    const [delayArray, setDelayArray] = useState<number[]>([])
    useEffect(() => {
        const strippedPrev = +stripNonNumbers(text)
        const strippedNext = +stripNonNumbers(props.text)
        setText(text)
        if (strippedPrev === strippedNext) {
            return null
        }

        const prevNum = getNumbers(strippedPrev)
        const nextNum = getNumbers(strippedNext)
        const delayArray = []

        for (let i = 0; i < nextNum.length; i++) {
            if (nextNum[i] !== prevNum[i]) {
                delayArray.push(i)
            }
        }
        setText(text)

    }, [props.text])

    const renderReels = (parts: IPart[]) => {
        let ind = 0
        let strInd = 0


        const values = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        return parts.map(({ type, value }, partIndex) => {
            switch (type) {
                case TYPE_INT:
                case TYPE_FRACTION:
                    // both integers and fractions contain numbers we want to spin
                    return (
                        <React.Fragment key={type + partIndex}>
                            {
                                getNumbers(value).map((number) => {
                                    const output = (
                                        <ReelsNumbers

                                            duration={props.duration}
                                            key={type + ind}
                                            delay={delay(ind, delayArray, props.delay)}
                                            number={number}
                                            values={values}
                                        />
                                    )

                                    ind++

                                    return output
                                })
                            }
                        </React.Fragment>
                    )
                // for any other segment we want a static reel with one value in it's array
                default:
                    const output = <ReelsNumbers key={type + strInd} values={[value]} />

                    strInd++

                    return output
            }
        })
    }

    const parts = getParts(props.text)

    return (
        <div aria-label={props.text} className={styles.root}>
            <div role='presentation'  className={styles.reel}>
                {renderReels(parts)}
            </div>
        </div>
    )
}
Reels.defaultProps = {
    duration: 700,
    delay: 85,
}