import React, {RefObject, createRef, useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import {Roulette} from './roulette'
import cx from 'classnames'
import {RouletteFieldColorsMap} from 'components/for_pages/games/Roulette/data/enums'
interface Props {
  width: string;
  height: string;
  number: number
  hasResult: boolean
}


const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
) => {

  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  if (!canvas?.getContext('2d')) {
    return
  }
  let roulette = new Roulette(canvas, ctx)
  roulette.init()
  return roulette
}
// eslint-disable-next-line react/display-name
const Canvas =  React.forwardRef(({width, height}: {width: string, height: string}, ref) => {

  // @ts-ignore
  return (<canvas className={styles.wheel} ref={ref} width={width} height={height} />)
})
const WheelCanvas = ({
                       width,
                       height,
                        number,
  hasResult
                     }: Props): JSX.Element => {
  const canvasRef = createRef<HTMLCanvasElement>()
  const rouletteRef = useRef<typeof  Roulette>(null)
  const [showNumber ,setShowNumber] = useState(false)

  useEffect(() => {
    if(!rouletteRef.current) {
      rouletteRef.current = drawWheel(canvasRef)
        if( rouletteRef.current) {
          (rouletteRef.current as any).putBallAtSlot(0)
        }
    }

  }, [canvasRef])
  useEffect(() => {
    console.log('putBallAtSlot', number)
    if(hasResult && typeof number !== 'undefined'){
      (rouletteRef.current as any).putBallAtSlot(number, 3000)
      setTimeout(() => {
        setShowNumber(true)
      }, 2700)
    }

  }, [number, hasResult ])
  useEffect(() => {
    if(!hasResult){
      setShowNumber(false)
    }
  }, [hasResult])
  return <div className={cx(styles.root)}>
    <div className={styles.wrapper}>
    <Canvas width={width} height={height} ref={canvasRef}/>
    <div className={cx(styles.circle, {[styles.green]: true, [styles.visible]: showNumber &&  RouletteFieldColorsMap[number] === 'green'})}>  {number}</div>
    <div className={cx(styles.circle, {[styles.red]: true, [styles.visible]: showNumber && RouletteFieldColorsMap[number] === 'red'})}>  {number}</div>
    <div className={cx(styles.circle, {[styles.black]: true, [styles.visible]:showNumber &&  RouletteFieldColorsMap[number] === 'black'})}>  {number}</div>
    </div>
  </div>
}

export default WheelCanvas
