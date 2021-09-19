import React from 'react'
import { canvasSizeData, fontWeightData, DEFAULT_FONT_WEIGHT } from '../../constants'
import './Control.css'
import GColorPicker from '../GColorPicker'

type Props = {
  data: any
  dataUpdate: (key: string, value: any) => void
  onSave: () => void
}

class Control extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleCanvasSizeChange = this.handleCanvasSizeChange.bind(this)
  }

  handleWordsDataChange(key: string, value: string) {
    const { dataUpdate, data } = this.props
    const _words = Object.assign({}, data.words)
    _words[key] = value
    dataUpdate('words', _words)
  }

  handleColorChange(res: any) {
    const { dataUpdate } = this.props
    dataUpdate('bgColor', res.hex)
  }

  handleCanvasSizeChange(e: any) {
    const { dataUpdate } = this.props
    const _value = e.currentTarget.value
    const result = canvasSizeData.find((el) => el.value === _value)
    if (result) {
      dataUpdate('size', result.data)
    }
  }

  render() {
    const { onSave, data } = this.props

    return (
      <div className='control-container'>
        <section>
          <h1> Canvas </h1>
          <div>
            <span> Size </span>
            <select defaultValue={1} onChange={this.handleCanvasSizeChange}>
              {canvasSizeData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span> Background Color </span>
            <GColorPicker color={data.bgColor} onChange={this.handleColorChange} />
          </div>
        </section>
        <section>
          <h1> Words </h1>
          <div>
            <span>Content</span>
            <textarea
              rows={4}
              cols={35}
              placeholder='enter your words'
              value={data.words.text}
              onChange={(e) => {
                let value = e.currentTarget.value
                this.handleWordsDataChange('text', value)
              }}
            />
          </div>
          <div>
            <span>Font Size</span>
            <input
              placeholder='change font size'
              value={data.words.fontSize}
              type='number'
              onChange={(e) => {
                this.handleWordsDataChange('fontSize', e.currentTarget.value)
              }}
            />
          </div>
          <div>
            <span>Font Weight</span>
            <select
              defaultValue={DEFAULT_FONT_WEIGHT}
              onChange={(e) => this.handleWordsDataChange('fontWeight', e.currentTarget.value)}
            >
              {fontWeightData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>Letter Spacing</span>
            <input
              placeholder='change the letter spacing'
              value={data.words.letterSpacing}
              type='number'
              onChange={(e) => {
                this.handleWordsDataChange('letterSpacing', e.currentTarget.value)
              }}
            />
          </div>
          <div>
            <span>Text Color</span>
            <GColorPicker
              color={data.words.color}
              onChange={(res) => {
                this.handleWordsDataChange('color', res.hex)
              }}
            />
          </div>
        </section>
        <section>
          <span> Save </span>
          <button onClick={onSave}>Download</button>
        </section>
      </div>
    )
  }
}

export default Control
