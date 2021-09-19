import React, { Component, createRef } from 'react'
import Control from './components/Control'
import {
  defaultText,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_FONT_WEIGHT,
} from './constants'
import './App.css'
import generate from './utils/generateId'
import downloadFile from './utils/downloadFile'
import GRender from './GRender'
import Text from './GRender/Text'

const getInitFontSize = ({ fromSize = 36, canvasWidth = DEFAULT_WIDTH } = {}) =>
  (fromSize * canvasWidth) / DEFAULT_WIDTH
type Props = {}
type CanvasDataState = {
  size: {
    width: number
    height: number
  }
  bgColor: string
  words: {
    text: string
    fontSize: number
    fontWeight: string
    color: string
    letterSpacing: number
  }
}
type State = {
  imgUrl: string
  canvasData: CanvasDataState
}
class App extends Component<Props, State> {
  state = {
    imgUrl: '',
    canvasData: {
      size: {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      },
      bgColor: DEFAULT_BACKGROUND_COLOR,
      words: {
        text: defaultText,
        fontSize: getInitFontSize(),
        fontWeight: DEFAULT_FONT_WEIGHT,
        color: DEFAULT_COLOR,
        letterSpacing: 5,
      },
    },
  }

  canvasRef = createRef<HTMLCanvasElement>()
  canvas: HTMLCanvasElement | null = null
  GText: Text | null = null
  ctx: CanvasRenderingContext2D | null = null

  initCanvasData = () => {
    const canvas = this.canvasRef.current
    if (canvas) {
      this.canvas = canvas
      this.ctx! = canvas.getContext('2d') as CanvasRenderingContext2D
      this.GText = new GRender.Text({
        canvas,
        ctx: this.ctx,
      })
    }
  }

  draw(canvasData: CanvasDataState) {
    const self = this
    const { ctx } = self
    const { size, bgColor, words } = canvasData
    const { position } = words as any
    const { width, height } = size
    const elementPosition = !position
      ? {
          x: width / 2,
          y: height / 2,
        }
      : position

    ctx!.clearRect(0, 0, width, height)
    ctx!.beginPath()
    ctx!.rect(0, 0, width, height)
    ctx!.fillStyle = bgColor
    ctx!.fill()

    this.GText!.draw({
      ...words,
      position: elementPosition,
    })
  }

  getImgSrc(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL('image/png')
    return dataUrl
  }

  componentDidMount() {
    this.initCanvasData()
    this.draw(this.state.canvasData)
  }

  handleDataUpdate = (key: any, value: any) => {
    const _canvasData = Object.assign({}, this.state.canvasData)
    // @ts-ignore
    _canvasData[key] = value as any
    console.log(_canvasData)
    this.setState({
      canvasData: _canvasData,
    })
  }

  componentDidUpdate() {
    this.draw(this.state.canvasData)
  }

  handleSave = () => {
    const { canvas } = this
    downloadFile(generate(), this.getImgSrc(canvas!))
  }

  render() {
    const { canvasData } = this.state
    const { width, height } = canvasData.size

    return (
      <div className='App'>
        {/* <div className='under-construction'>
          UNDER  construction, COME  tomorrow
        </div> */}
        <div className='render'>
          <canvas style={{ maxWidth: '90%' }} ref={this.canvasRef} width={width} height={height} />
          <div className='size-label'>{width + '*' + height}</div>
        </div>
        <Control dataUpdate={this.handleDataUpdate} data={canvasData} onSave={this.handleSave} />
      </div>
    )
  }
}

export default App
