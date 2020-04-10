import React, { Component } from 'react'

import objects from './objects'
import './App.css'

import WhiteBoard, {
  getWhiteBoardData,
  loadWhiteBoardData,
  addWhiteBoardObject,
} from 'fabric-whiteboard'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'select',
      width: '600px',
      height: '600px',
      brushColor: '#f44336',
      brushThickness: 2,
    }

    this.calcBoundsSize = this.calcBoundsSize.bind(this)
    this.handleBoundsSizeChange = this.handleBoundsSizeChange.bind(this)

    this.handleOnModeClick = this.handleOnModeClick.bind(this)
    this.handleOnBrushColorChange = this.handleOnBrushColorChange.bind(this)
    this.handleOnBrushThicknessChange = this.handleOnBrushThicknessChange.bind(
      this
    )
    this.handleOnObjectAdded = this.handleOnObjectAdded.bind(this)
  }

  componentDidMount() {
    this.calcBoundsSize()

    window.addEventListener('resize', this.handleBoundsSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleBoundsSizeChange)
  }

  render() {
    const { mode, width, height, brushColor, brushThickness } = this.state

    return (
      <div className="App" id="App">
        <div className="whiteboard" id="whiteboard">
          <WhiteBoard
            width={width}
            height={height}
            showToolbar={true}
            showBoard={true}
            mode={mode}
            onModeClick={this.handleOnModeClick}
            brushColor={brushColor}
            brushColors={[
              '#f44336',
              '#e91e63',
              '#9c27b0',
              '#673ab7',
              '#3f51b5',
              '#2196f3',
            ]}
            brushThickness={brushThickness}
            onBrushColorChange={this.handleOnBrushColorChange}
            onBrushThicknessChange={this.handleOnBrushThicknessChange}
            onObjectAdded={this.handleOnObjectAdded}
          />
        </div>

        <div className="toolbar" id="toolbar">
          <button
            className="toolbar-button"
            onClick={() => {
              const jsonData = getWhiteBoardData()
              console.info(JSON.stringify(jsonData))
              const domTextarea = document.getElementById('toolbar-textarea')
              if (domTextarea) {
                domTextarea.value = JSON.stringify(jsonData)
              }
            }}
          >
            Get
          </button>

          <textarea id="toolbar-textarea"></textarea>
          <button
            className="toolbar-button"
            onClick={() => {
              const domTextarea = document.getElementById('toolbar-textarea')
              if (
                domTextarea &&
                domTextarea.value &&
                domTextarea.value !== ''
              ) {
                loadWhiteBoardData(domTextarea.value, (e) => {
                  console.info('load whiteboard data succed', e)
                })
              }
            }}
          >
            Set
          </button>
        </div>

        <div>
          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.pen)
            }}
          >
            Add Pen
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.line)
            }}
          >
            Add Line
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.dotLine)
            }}
          >
            Add DotLine
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.arrow)
            }}
          >
            Add Arrow
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.text)
            }}
          >
            Add Text
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.rectangle)
            }}
          >
            Add Rectangle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.triangle)
            }}
          >
            Add Triangle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.circle)
            }}
          >
            Add Circle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(objects.ellipse)
            }}
          >
            Add Ellipse
          </button>
        </div>
      </div>
    )
  }

  calcBoundsSize() {
    return
    const domApp = document.getElementById('App')
    const domToolbar = document.getElementById('toolbar')

    const domAppStyle = window.getComputedStyle(domApp)
    const domToolbarStyle = window.getComputedStyle(domToolbar)

    this.setState({
      width: domAppStyle.width,
      height: `${
        parseInt(domAppStyle.height, 10) -
        parseInt(domToolbarStyle.height, 10) -
        20
      }px`,
    })
  }

  handleBoundsSizeChange() {
    this.calcBoundsSize()
  }

  handleOnModeClick(mode) {
    this.setState({
      mode: mode,
    })
  }

  handleOnBrushColorChange(color) {
    this.setState({
      brushColor: color.hex,
    })
  }

  handleOnBrushThicknessChange(thickness) {
    this.setState({
      brushThickness: thickness,
    })
  }

  handleOnObjectAdded(object) {
    console.info('new object', JSON.stringify(object))
    console.info('try pase', JSON.parse(JSON.stringify(object)))
  }
}
