
type PositionType = {
  x: number
  y: number
}
type drawOptions = {
  fontWeight: string, text: string, position: PositionType, color: string, fontSize: number, letterSpacing: number
}

class Text {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null
  _scale = 0
  isHold = false
  isInPath = false
  position: PositionType = { x: 0, y: 0 }
  text: string = ''
  fontSize: number = 0
  onHold: (x: number, y: number) => void = () => { }

  constructor (options: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) {
    this.initData(options)
    // this.bindEvent()
  }

  initData (props: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) {
    this.canvas = props.canvas
    this.ctx = props.ctx
    const computeWidth = parseInt(getComputedStyle(this.canvas).width.slice(0, -2), 10)
    const attrWidth = this.canvas.width
    const _scale = computeWidth / attrWidth
    this._scale = _scale
    this.isHold = false
    this.isInPath = false
  }

  draw (options: drawOptions) {
    const { canvas, ctx } = this
    const { fontWeight = 'normal', text, position, color = '#000', fontSize = 16, letterSpacing = 10 } = options
    const { x, y } = position
    if (canvas && ctx) {
      canvas.style.letterSpacing = `${ letterSpacing }px`
      ctx.save()
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${ fontWeight } ${ fontSize }px system-ui`
      ctx.fillText(text, x + letterSpacing / 2, y)
      ctx.restore()
    }
  }

  inPath (x: number, y: number) {
    const self = this
    const { ctx, position, text, fontSize } = self
    if (ctx) {
      ctx.save()
      ctx.font = `${ fontSize }px system-ui`
      const fontWidth = ctx.measureText(text).width

      const padding = 10
      const rectLeft = position.x - padding - fontWidth / 2
      const rectTop = position.y - padding - fontSize / 2
      const rectWidth = fontWidth + padding * 2
      const rectHeight = fontSize + padding * 2

      ctx.beginPath()
      ctx.moveTo(position.x, position.y)
      ctx.rect(rectLeft, rectTop, rectWidth, rectHeight)
      const ret = ctx.isPointInPath(x, y)
      ctx.closePath()
      ctx.restore()
      return ret
    }
    return false
  }

  handleMousemove (x: number, y: number) {
    const self = this
    // const { ctx, position, text, fontSize, _scale, isHold } = self
    const _x = x / self._scale
    const _y = y / self._scale
    if (self.inPath(_x, _y)) {
      document.body.style.cursor = '-webkit-grab'
      self.isInPath = true
    } else {
      self.isInPath = false
      document.body.style.cursor = 'default'
    }
  }

  handleHold (x: number, y: number) {
    typeof this.onHold === 'function' && this.onHold(x, y)
  }

  handleMouseleave () { }

  bindEvent () {
    const self = this
    const { canvas } = self
    if (canvas) {
      canvas.addEventListener('mousemove', function (e) {
        self.handleMousemove(e.offsetX, e.offsetY)
      })

      canvas.addEventListener('mousedown', function (e) {
        self.isHold = true
        if (self.isInPath) {
          document.body.style.cursor = '-webkit-grabbing'
        }
      })

      canvas.addEventListener('mouseup', function (e) {
        const _x = e.offsetX / self._scale
        const _y = e.offsetY / self._scale
        self.isHold = false
        document.body.style.cursor = 'default'
        if (self.isInPath) {
          self.handleHold(_x, _y)
        }
      })
    }
  }
}

export default Text
