import { Bodies, Body, IChamferableBodyDefinition, Vector } from 'matter-js'
import { ISettings, ISize } from './Game'
import LabelHelper from './LabelHelper'
import { PLINKO_SIZE_FACTOR, BUCKET_FACTOR, BUCKETS_INDEXES } from './constants'

export default class BodyMaker {
  _settings: ISettings

  constructor(setting: ISettings) {
    this._settings = setting
  }

  get bucketShiftSize() {
    return this._settings.isVerticalBucket ? this.bucketSize.height / 6 : this.bucketSize.height / 4
  }

  get _pegRadius(): number {
    return Math.round(this._settings.size.height / this._settings.pegsRows / 6)
  }

  get bucketSize(): ISize {
    const innerColumn = this._innerWidth / this._settings.pegsColumns
    const aspectRatio = this._settings.isVerticalBucket ? 0.65 : 1.29
    return {
      width: innerColumn / BUCKET_FACTOR,
      height: innerColumn / aspectRatio / BUCKET_FACTOR,
    }
  }

  get _sidePadding(): number {
    const offsetFactor = this._settings.isVerticalBucket ? 1 : 0.5 // the more the narrower
    return this._settings.size.width / this._settings.pegsColumns * offsetFactor
  }

  get _innerWidth(): number {
    return this._settings.size.width - 2 * this._sidePadding
  }

  makePeg(x: number, y: number, id: number): Body {
    const radius = this._pegRadius
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
    const radius = this._pegRadius * PLINKO_SIZE_FACTOR
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
    const radius = this._pegRadius * PLINKO_SIZE_FACTOR
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
    const pegRadius = this._pegRadius
    const bucketSize = this.bucketSize
    const bottomOffset = pegRadius + bucketSize.height + 10 + this.bucketShiftSize
    const grid = Array(this._settings.pegsRows).fill(null).map(
      (value, rowIndex) => {
        const innerColumn = this._innerWidth / this._settings.pegsColumns
        const h = (this._settings.size.height - bottomOffset) / this._settings.pegsRows
        const freeSpace = innerColumn * (this._settings.pegsRows - rowIndex - 1) / 2
        return Array(rowIndex + 3).fill(null).map((valueInner, indexInner) =>
          this.makePeg(
            this._sidePadding + innerColumn * indexInner + innerColumn / 2 + freeSpace,
            h * (rowIndex + 1),
            rowIndex * 1000 + indexInner,
          )
        )
      }
    )
    return grid.reduce((acc, curr) => [...acc, ...curr], [])
  }

  makeRealBucket(x: number, y: number, id: number): Body {
    const size = this.bucketSize
    const dy = this._settings.isVerticalBucket ? size.height / 12 : size.height / 5
    return Bodies.fromVertices(x, y, [
      [
        Vector.create(0, 0),
        Vector.create(size.width / 2.4, dy),
        Vector.create(size.width - size.width / 2.4, dy),
        Vector.create(size.width, 0),
        Vector.create(size.width, size.height),
        Vector.create(0, size.height),
      ],
    ], {
      isStatic: true,
      render: {
        visible: false,
        fillStyle: '#ffffff',
      },
      label: LabelHelper.createRealBucketLabel(id)
    })
  }

  makeFakeBucket(x: number, y: number, id: number): Body {
    const indexes: number[] = BUCKETS_INDEXES[this._settings.pegsRows]
    const size = this.bucketSize
    return Bodies.rectangle(x, y, size.width, size.height, {
      isStatic: true,
      isSensor: true,
      render: {
        // fillStyle: '#ffffff'
        sprite: this._settings.isVerticalBucket ? {
          texture: `/img/Games/plinko/groups/${indexes[id]}/short_w.png`,
          xScale: size.width / 57,
          yScale: size.width / 57,
        } : {
          texture: `/img/Games/plinko/groups/${indexes[id]}/long.png`,
          xScale: size.width / 84,
          yScale: size.width / 84,
        },
      },
      label: LabelHelper.createFakeBucketLabel(id)
    })
  }

  makeOutlines(): Body[] {
    const options: IChamferableBodyDefinition = {
      isStatic: true,
      render: {
        visible: false,
        fillStyle: '#ffffff',
      }
    }
    const offset = this._sidePadding + this._innerWidth / this._settings.pegsColumns / 2 - this._pegRadius
    const leftSide = Bodies.rectangle(
      offset,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    const rightSide = Bodies.rectangle(
      this._settings.size.width - offset,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    return [leftSide, rightSide]
  }

  makeBucketsRow(): Body[] {
    const y = this._settings.size.height - this.bucketSize.height / 2 - this.bucketShiftSize
    const arrs = Array(this._settings.bucketsColumns).fill(null).map((value, index) => {
      const innerColumn = this._innerWidth / this._settings.pegsColumns
      const x = this._sidePadding + innerColumn * index + this.bucketSize.width + this._pegRadius / 2
      return [
        this.makeRealBucket(x, y, index),
        this.makeFakeBucket(x, y, index)
      ]
    })
    return arrs.reduce((acc, curr) => [...acc, ...curr], [])
  }

  makeBackgrounds(): Body[] {
    const height = this._settings.size.height - this.bucketShiftSize
    const pyramid = Bodies.rectangle(
      this._settings.size.width / 2,
      height / 2,
      this._settings.size.width,
      height,
      {
        isStatic: true,
        isSensor: true,
        render: {
          // fillStyle: '#ffffff'
          sprite: {
            texture: '/img/Games/plinko/background.png',
            xScale: height / 617,
            yScale: height / 617,
          },
        },
        label: 'background'
      }
    )
    return [pyramid]
  }

}
