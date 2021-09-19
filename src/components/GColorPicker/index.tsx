import React from 'react'
import './style.css'
import { ColorResult, RGBColor, SketchPicker } from 'react-color'

const DEFAULT_COLOR = {
  r: 241,
  g: 112,
  b: 19,
  a: 1,
}

type Props = {
  color: RGBColor
  containerStyle?: React.CSSProperties
  onChange: (color: ColorResult) => void
}

type State = {
  displayColorPicker: boolean
  color: RGBColor
}

class GColorPicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: this.props.color || DEFAULT_COLOR,
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ color: color.rgb })
    this.props.onChange && this.props.onChange(color)
  }

  getPreviewColor = () =>
    typeof this.state.color === 'string'
      ? this.state.color
      : `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`

  render() {
    const previewColor = this.getPreviewColor()

    return (
      <div className='g-color-picker-wrapper' style={this.props.containerStyle}>
        <div className='g-color-picker-swatch' onClick={this.handleClick}>
          <div
            className='g-color-picker-preview-color-after'
            style={{ backgroundColor: previewColor }}
          ></div>
          <div className='g-color-picker-preview-color' style={{ backgroundColor: previewColor }} />
        </div>
        {this.state.displayColorPicker ? (
          <div className='g-color-picker-popover'>
            <div className='g-color-picker-overlay' onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default GColorPicker
