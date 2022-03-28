
export const Roulette = function (_canvas, _context){

  const GREEN      = '#72f897'
  const DARK_GREEN = '#265232'

  const RED      = '#d82e2e'
  const DARK_RED = '#470f0f'

  const BLACK      = '#130e19'
  const DARK_BLACK = '#060508'

  const CENTER_ORNAMENT = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjcycHgiIGhlaWdodD0iNzJweCIgdmlld0JveD0iMCAwIDcyIDcyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MiAoMzY3ODEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPldoZWVsIGhhbmRsZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGQ9Ik0zOC4xMzgxMjA1LDcuMzgxMjA1MzkgTDM5Ljg1NjQxMzgsMjQuNTY0MTM4MiBDNDMuMjUyMjg3OSwyNS43MDMwNjM2IDQ2LjA0NzM1NTcsMjguNDgyNDUxOCA0Ny4yOTYzMDMzLDMyLjEyOTYyOTYgTDY0LjYxODc5NDYsMzMuODYxODc5NSBDNjUuMzI3ODk2MiwzMi43NDI4NTggNjYuNTc3MTk2MiwzMiA2OCwzMiBDNzAuMjA5MTM5LDMyIDcyLDMzLjc5MDg2MSA3MiwzNiBDNzIsMzguMjA5MTM5IDcwLjIwOTEzOSw0MCA2OCw0MCBDNjYuNTc3MTk2Miw0MCA2NS4zMjc4OTYyLDM5LjI1NzE0MiA2NC42MTg3OTQ2LDM4LjEzODEyMDUgTDQ3LjQ0MTg1NywzOS44NTU4MTQzIEM0Ni4yNzUxMzgyLDQzLjM5MDk4NjEgNDMuMzkwOTg2MSw0Ni4yNzUxMzgyIDM5Ljg1NTgxNDMsNDcuNDQxODU3IEwzOC4xMzgxMjA1LDY0LjYxODc5NDYgQzM5LjI1NzE0Miw2NS4zMjc4OTYyIDQwLDY2LjU3NzE5NjIgNDAsNjggQzQwLDcwLjIwOTEzOSAzOC4yMDkxMzksNzIgMzYsNzIgQzMzLjc5MDg2MSw3MiAzMiw3MC4yMDkxMzkgMzIsNjggQzMyLDY2LjU3NzE5NjIgMzIuNzQyODU4LDY1LjMyNzg5NjIgMzMuODYxODc5NSw2NC42MTg3OTQ2IEwzMi4xMjk2MzA3LDQ3LjI5NjMwNzEgQzI4LjQ4MjQ1MTgsNDYuMDQ3MzU1NyAyNS43MDMwNjM2LDQzLjI1MjI4NzkgMjQuNTY0MTM4MiwzOS44NTY0MTM4IEw3LjM4MTIwNTM5LDM4LjEzODEyMDUgQzYuNjcyMTAzNzksMzkuMjU3MTQyIDUuNDIyODAzNzksNDAgNCw0MCBDMS43OTA4NjEsNDAgOS40MzU1MzIwMmUtMTUsMzguMjA5MTM5IDkuNTcwODAyNzdlLTE1LDM2IEM5LjcwNjA3MzUyZS0xNSwzMy43OTA4NjEgMS43OTA4NjEsMzIgNCwzMiBDNS40MjI4MDM3OSwzMiA2LjY3MjEwMzc5LDMyLjc0Mjg1OCA3LjM4MTIwNTM5LDMzLjg2MTg3OTUgTDI0LjcxMjI4ODMsMzIuMTI4NzcxMiBDMjUuOTMyMTAwMiwyOC42MzEzOTQgMjguNjMxMzk0LDI1LjkzMjEwMDIgMzIuMTI4NzcxMiwyNC43MTIyODgzIEwzMy44NjE4Nzk1LDcuMzgxMjA1MzkgQzMyLjc0Mjg1OCw2LjY3MjEwMzc5IDMyLDUuNDIyODAzNzkgMzIsNCBDMzIsMS43OTA4NjEgMzMuNzkwODYxLC00LjI2MzI1NjQxZS0xNCAzNiwtNC4yNjMyNTY0MWUtMTQgQzM4LjIwOTEzOSwtNC4yNjMyNTY0MWUtMTQgNDAsMS43OTA4NjEgNDAsNCBDNDAsNS40MjI4MDM3OSAzOS4yNTcxNDIsNi42NzIxMDM3OSAzOC4xMzgxMjA1LDcuMzgxMjA1MzkgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlJvdWxldHRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR2FtZS0tLVJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzQyLjAwMDAwMCwgLTIxMC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAuMDAwMDAwLCA5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJXaGVlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIyLjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlRvcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCA1Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IldoZWVsLWhhbmRsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCA0NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRDEwMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0Q2QTk0OSIgY3g9IjM2IiBjeT0iMzYiIHI9IjciPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZCRDYzRSIgY3g9IjM2IiBjeT0iMzYiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
  const BALL_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMSAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfaV8yOTMxXzI3NDUzOCkiPgo8cGF0aCBkPSJNMTEgNi4xNzkyNkMxMSA5LjQxMDIxIDguNTM3NTcgMTIuMDI5NCA1LjUgMTIuMDI5NEMyLjQ2MjQzIDEyLjAyOTQgMCA5LjQxMDIxIDAgNi4xNzkyNkMwIDIuOTQ4MzEgMi40NjI0MyAwLjMyOTEwMiA1LjUgMC4zMjkxMDJDOC41Mzc1NyAwLjMyOTEwMiAxMSAyLjk0ODMxIDExIDYuMTc5MjZaIiBmaWxsPSIjRkVGRkYwIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8yOTMxXzI3NDUzOCIgeD0iLTIuMjUwNiIgeT0iLTIuMTE3MiIgd2lkdGg9IjEzLjI1MDYiIGhlaWdodD0iMTQuMTQ2NSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMi4yNTA2IiBkeT0iLTIuNDQ2MyIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyLjIyMzkxIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC42IDAgMCAwIDAgMC4zNTc5NSAwIDAgMCAwIDAuMzQyNSAwIDAgMCAxIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9InNoYXBlIiByZXN1bHQ9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMjkzMV8yNzQ1MzgiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg=='
  const FULL_CIRCLE = 2 * Math.PI

  const _numbers = [
    '0', '32', '15', '19',
    '4', '21', '2', '25',
    '17', '34', '6', '27',
    '13', '36', '11', '30',
    '8', '23', '10', '5',
    '24', '16', '33', '1',
    '20', '14', '31', '9',
    '22', '18', '29', '7',
    '28', '12', '35', '3', '26',
  ]

  const _outerColors = [
    GREEN,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
    RED, BLACK, RED, BLACK,
  ]
  const _slotsAngle = {}
  const _innerColors = [
    DARK_GREEN,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
    DARK_RED, DARK_BLACK, DARK_RED, DARK_BLACK,
  ]

  const canvas = _canvas
  const ctx    = _context

  const _slotTotal = 37
  const _arcAngle  = FULL_CIRCLE / _slotTotal

  let _outerEdge = {
      radius: 0,
    },
    _outerRing = {
      outerRadius: 0,
      innerRadius: 0,
    },
    _innerRing = {
      outerRadius: 0,
      innerRadius: 0,
    },
    _ornament  = {
      x     : 0,
      y     : 0,
      width : 0,
      height: 0,
      img   : null,
    },
    _slotText  = {
      size  : 0,
      radius: 0,
      font  : 'bold 12px Gilroy',
    }

  let _centerX,
    _centerY,
    _startOfTime = 0,
    _worldAngle  = 0

  let _ball = {
    img: null,
    x         : 0,
    y         : 0,
    radius    : 0,
    vertOffset: 0,
    vertRange : 0,
  }

  let _ballSettings = {
    showBall       : false,
    spinStartTime  : 0,
    spinFinalTime  : 0,
    spinTotalTime  : 0,
    spinElapsedTime: 0,
    startPosition  : 0,
    finalPosition  : 0,
    arcIncrement   : 0,
    spinTimeElapsed: 0,
  }

  function drawFrame() {
    if (_ballSettings.showBall) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      redrawBackground(ctx)

      ctx.translate(_centerX, _centerY)

      _ballSettings.spinTimeElapsed = Date.now() - _ballSettings.spinStartTime

      let f = _ballSettings.spinTimeElapsed /
        _ballSettings.spinTotalTime

      f = f > 1 ? 1 : f

      ctx.rotate((_worldAngle + _ballSettings.finalPosition) * f)

      ctx.beginPath()

      let vertDeceleration, g = _ballSettings.spinTimeElapsed / (_ballSettings.spinTotalTime)

      g = g > 1 ? 1 : g
      if (g < 0.1) vertDeceleration = 1
      else vertDeceleration = (1 - g) * Math.abs(Math.sin(2 * g * g * _worldAngle))

      let x = _ball.vertOffset + _ball.vertRange * vertDeceleration
     // ctx.arc(x, 0, _ball.radius, 0, FULL_CIRCLE)
      ctx.fillStyle = 'white'
   // ctx.fill()
     ctx.drawImage(_ball.img, x- _ball.radius, 0, _ball.radius *2, _ball.radius *2)


      ctx.setTransform(1, 0, 0, 1, 0, 0)

    }

    requestAnimationFrame(drawFrame)
  }

  function findIndexOfSlot(num) {
    let slotNum = _numbers.indexOf(`${num}`)

    if (slotNum < 0) return false

    return {
      index   : slotNum,
      position:_arcAngle * (slotNum + 0.5),
    }
  }

  function initBallSpin(num, time = 5000) {
    _ballSettings.spinTotalTime = time
    _ballSettings.spinStartTime = Date.now()
    _ballSettings.spinFinalTime = _ballSettings.spinStartTime + _ballSettings.spinTotalTime

    setTimeout(function() {
      _ballSettings.showBall = false
    }, time)
  }

  this.putBallAtSlot = function(num: number, time?: number) {
    let slot = findIndexOfSlot(num)
    if (slot === false) {
      _ballSettings.showBall = false
      return
    }

    initBallSpin(num, time)

    _ballSettings.finalPosition = 2 * 2 * Math.PI + slot.position

    _ballSettings.startPosition = _worldAngle
    _ballSettings.arcIncrement  = (_ballSettings.finalPosition -
      _ballSettings.startPosition) /
      _ballSettings.spinTotalTime
    _ballSettings.showBall = true
  }

  this.init = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    _worldAngle = 0

    _centerX = canvas.width / 2
    _centerY = canvas.height / 2

    _outerEdge.radius = canvas.width / 2

    _outerRing.outerRadius = canvas.width * 1 / 2
    _outerRing.innerRadius = canvas.width * 0.8 / 2

    _innerRing.outerRadius = _outerRing.innerRadius
    _innerRing.innerRadius = _innerRing.outerRadius * 0.7

    _slotText.radius = _outerRing.innerRadius + (_outerRing.outerRadius - _outerRing.innerRadius) * 0.5
    _slotText.size   = (_outerRing.outerRadius - _outerRing.innerRadius) * 0.45

    _slotText.font = `bold ${_slotText.size}px Gilroy`

    _ornament.img     = new Image()
    _ornament.img.src = CENTER_ORNAMENT

    _ornament.x     = _ornament.y = -_innerRing.innerRadius / 2
    _ornament.width = _ornament.height = _innerRing.innerRadius

    _ball.radius     = ((_outerRing.outerRadius -  _innerRing.outerRadius )/ 2 ) * 0.5
    _ball.vertOffset = _innerRing.outerRadius
    _ball.vertRange  = (_outerRing.outerRadius)
    _ball.img = new Image()
    _ball.img.src = '/img/Games/roulette/ball.png'
    _startOfTime = Date.now()

    redrawBackground(ctx)
    requestAnimationFrame(drawFrame)
  }

  function redrawBackground(ctx) {
    for (let i = 0; i < _slotTotal; i++) {
      let angle = i * _arcAngle, _endAngle = angle + _arcAngle
      _slotsAngle[i] = angle + ((_endAngle - angle)/ 2)
      ctx.fillStyle = '#1D1E25'
      ctx.beginPath()
      ctx.arc(_centerX, _centerY, _outerEdge.radius, 0, FULL_CIRCLE, true)
      ctx.arc(_centerX, _centerY, _outerRing.outerRadius, 0, FULL_CIRCLE, false)
      ctx.fill()

      ctx.fillStyle = _outerColors[i]
      ctx.beginPath()
      ctx.arc(_centerX, _centerY, _outerRing.outerRadius, angle, _endAngle, false)
      ctx.arc(_centerX, _centerY, _outerRing.innerRadius, _endAngle, angle, true)
      ctx.fill()

      ctx.fillStyle = _innerColors[i]
      ctx.beginPath()
      ctx.arc(_centerX, _centerY, _innerRing.outerRadius, angle, _endAngle, false)
      ctx.arc(_centerX, _centerY, _innerRing.innerRadius, _endAngle, angle, true)
      ctx.fill()

      ctx.fillStyle = DARK_BLACK
      ctx.beginPath()
      ctx.arc(_centerX, _centerY, _innerRing.innerRadius, 0, FULL_CIRCLE, true)
      ctx.arc(_centerX, _centerY, 0, 0, FULL_CIRCLE, false)
      ctx.fill()

      ctx.save()
      ctx.font      = _slotText.font
      ctx.lineWidth = 2
      ctx.fillStyle = _numbers[i] === '0' ? '#130E19' : 'rgba(201,201,201,0.56)'
      ctx.translate(
        _centerX + Math.cos(angle + _arcAngle / 2) * _slotText.radius,
        _centerY + Math.sin(angle + _arcAngle / 2) * _slotText.radius,
      )

      ctx.rotate(angle + _arcAngle / 2 + Math.PI / 2)

      ctx.fillText(_numbers[i], -ctx.measureText(_numbers[i]).width / 2, 0)
      ctx.restore()
    }

    const f = function() {
      ctx.translate(_centerX, _centerY)
   //   ctx.drawImage(_ornament.img, _ornament.x, _ornament.y, _ornament.width, _ornament.height)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    if(_ballSettings.showBall) f()
    else setTimeout(f, 100)

    ctx.save()
  }

}
