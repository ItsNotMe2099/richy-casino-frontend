import { Bodies, Body, IChamferableBodyDefinition, Vector } from 'matter-js'
import { ISettings, ISize } from './Game'
import LabelHelper from './LabelHelper'
import { PLINKO_SIZE_FACTOR, BUCKET_FACTOR } from './constants'

export default class BodyMaker {
  _settings: ISettings

  constructor(setting: ISettings) {
    this._settings = setting
  }

  makePeg(x: number, y: number, id: number): Body {
    const radius = this._getPegRadius()
    return Bodies.circle(x, y, radius, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/img/Games/plinko/peg/peg.png',
          xScale: radius * 2 / 28,
          yScale: radius * 2 / 28,
        },
      },
      label: LabelHelper.createPegLabel(id)
    })
  }

  makeRealPlinko(x: number, y: number, id: number): Body {
    const radius = this._getPegRadius() * PLINKO_SIZE_FACTOR
    return Bodies.circle(x, y, radius, {
      restitution: 0.8,
      render: {
        visible: false,
        // fillStyle: `hsl(${Math.floor(360 * Math.random())}, 90%, 60%)`,
      },
      label: LabelHelper.createPlinkoLabel(id),
    })
  }

  makeFakePlinko(x: number, y: number): Body {
    const radius = this._getPegRadius() * PLINKO_SIZE_FACTOR
    return Bodies.circle(x, y, radius, {
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: '/img/Games/plinko/plinko/plinko.png',
          xScale: radius * 2 / 44,
          yScale: radius * 2 / 44,
        },
      },
      label: 'shadow',
    })
  }

  makePegsGrid(): Body[] {
    const center = this._settings.size.width / this._settings.pegsColumns / 2
    const grid = Array(this._settings.pegsRows).fill(null).map(
      (value, rowIndex) => {
        const y = (this._settings.size.width - 2 * center) / this._settings.pegsColumns
        const h = (this._settings.size.height - 40) / this._settings.pegsRows
        const n = y * (this._settings.pegsRows - rowIndex - 1) / 2
        return Array(rowIndex + 3).fill(null).map((valueInner, indexInner) =>
          this.makePeg(center + y * indexInner + y / 2 + n, h * rowIndex + h / 2, rowIndex * 1000 + indexInner)
        )
      }
    )
    return grid.reduce((acc, curr) => [...acc, ...curr], [])
  }

  makeRealBucket(x: number, y: number, id: number): Body {
    const size = this.getBucketSize()
    return Bodies.fromVertices(x, y, [
      [
        Vector.create(0, 0),
        Vector.create(size.width / 2.4, size.height / 5),
        Vector.create(size.width - size.width / 2.4, size.height / 5),
        Vector.create(size.width, 0),
        Vector.create(size.width, size.height),
        Vector.create(0, size.height),
      ],
    ], {
      isStatic: true,
      render: {
        visible: false,
        fillStyle: `hsl(${Math.floor(360 * Math.random())}, 90%, 60%)`,
      },
      label: LabelHelper.createRealBucketLabel(id)
    })
  }

  makeFakeBucket(x: number, y: number, id: number): Body {
    const size = this.getBucketSize()
    const imageId = Math.abs(id - Math.floor(this._settings.bucketsColumns / 2)) + 1
    return Bodies.rectangle(x, y, size.width, size.height, {
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `/img/Games/plinko/buckets/bucket_long_${imageId}.png`,
          xScale: size.width / 84,
          yScale: size.width / 84,
        },
      },
      label: LabelHelper.createFakeBucketLabel(id)
    })
  }

  makeOutlines(): Body[] {
    const onePegWidth = this._settings.size.width / this._settings.pegsColumns
    const pegRadius = this._getPegRadius()
    const options: IChamferableBodyDefinition = {
      isStatic: true,
      render: {
        visible: false,
        // fillStyle: '#ffffff',
      }
    }
    const leftSide = Bodies.rectangle(
      onePegWidth - pegRadius,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    const rightSide = Bodies.rectangle(
      this._settings.size.width - onePegWidth + pegRadius,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    return [leftSide, rightSide]
  }

  getBucketSize(): ISize {
    const onePegWidth = this._settings.size.width / this._settings.pegsColumns
    const widthRow = this._settings.size.width - onePegWidth
    const width = widthRow / this._settings.pegsColumns
    const aspectRatio = 1.29
    return {
      width: width / BUCKET_FACTOR,
      height: width / aspectRatio / BUCKET_FACTOR,
    }
  }

  makeBucketsRow(): Body[] {
    const size = this.getBucketSize()
    const arrs = Array(this._settings.bucketsColumns).fill(null).map((value, index) => {
      const x = size.width * BUCKET_FACTOR * index
        + size.width * BUCKET_FACTOR
        + (this._settings.size.width / this._settings.pegsColumns / 2)
      return [
        this.makeRealBucket(x, this._settings.size.height - size.height / 2, index),
        this.makeFakeBucket(x, this._settings.size.height - size.height / 2, index)
      ]
    })
    return arrs.reduce((acc, curr) => [...acc, ...curr], [])
  }

  _getPegRadius(): number {
    return (this._settings.pegsRows - 3)
      / ((this._settings.pegsRows - 7) / 2)
      * (this._settings.size.width / this._settings.size.height)
  }

}
