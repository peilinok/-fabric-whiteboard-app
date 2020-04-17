import React, { Component } from 'react'

import objects from './objects'
import './App.css'

import WhiteBoard, {
  getWhiteBoardData,
  loadWhiteBoardData,
  addWhiteBoardObject,
  modifyWhiteBoardObjects,
  removeWhiteBoardObjects,
  clearWhiteBoardContext,
  createWhiteBoardSelection,
  updateWhiteBoardSelection,
  clearWhiteBoardSelection,
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

    this.refLeft = undefined
    this.refRight = undefined

    this.calcBoundsSize = this.calcBoundsSize.bind(this)
    this.handleBoundsSizeChange = this.handleBoundsSizeChange.bind(this)

    this.handleOnModeClick = this.handleOnModeClick.bind(this)
    this.handleOnBrushColorChange = this.handleOnBrushColorChange.bind(this)
    this.handleOnBrushThicknessChange = this.handleOnBrushThicknessChange.bind(
      this
    )
    this.handleOnObjectAdded = this.handleOnObjectAdded.bind(this)
    this.handleOnObjectsModified = this.handleOnObjectsModified.bind(this)
    this.handleOnObjectsRemoved = this.handleOnObjectsRemoved.bind(this)
    this.handleOnSelectionCreated = this.handleOnSelectionCreated.bind(this)
    this.handleOnSelectionUpdated = this.handleOnSelectionUpdated.bind(this)
    this.handleOnSelectionCleared = this.handleOnSelectionCleared.bind(this)
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
            ref={(ref) => {
              this.refLeft = ref
            }}
            width={width}
            height={height}
            showToolbar={true}
            enableBoard={true}
            enableToolbar={true}
            showBoard={true}
            mode={mode}
            onModeClick={this.handleOnModeClick}
            fontSize={22}
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
            onObjectsModified={this.handleOnObjectsModified}
            onObjectsRemoved={this.handleOnObjectsRemoved}
            onSelectionCreated={this.handleOnSelectionCreated}
            onSelectionUpdated={this.handleOnSelectionUpdated}
            onSelectionCleared={this.handleOnSelectionCleared}
          />

          <WhiteBoard
            ref={(ref) => {
              this.refRight = ref
            }}
            width={width}
            height={height}
            showToolbar={true}
            enableBoard={true}
            enableToolbar={false}
            showBoard={true}
            mode={mode}
            fontSize={22}
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
          />
        </div>

        <div className="toolbar" id="toolbar">
          <button
            className="toolbar-button"
            onClick={() => {
              const jsonData = getWhiteBoardData(this.refLeft)
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
                loadWhiteBoardData(this.refRight, domTextarea.value, (e) => {
                  console.info('load whiteboard data succed', e)
                })
                loadWhiteBoardData(this.refLeft, domTextarea.value, (e) => {
                  console.info('load whiteboard data succed', e)
                })
              }
            }}
          >
            Set
          </button>
          <button
            className="toolbar-button"
            onClick={() => {
              clearWhiteBoardContext(this.refLeft)
              clearWhiteBoardContext(this.refRight)
            }}
          >
            Clear
          </button>
        </div>

        <div className="toolbar">
          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.pen)
            }}
          >
            Add Pen
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.line)
            }}
          >
            Add Line
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.dotLine)
            }}
          >
            Add DotLine
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.arrow)
            }}
          >
            Add Arrow
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.text)
            }}
          >
            Add Text
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.rectangle)
            }}
          >
            Add Rectangle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.triangle)
            }}
          >
            Add Triangle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.circle)
            }}
          >
            Add Circle
          </button>

          <button
            className="toolbar-button"
            onClick={() => {
              addWhiteBoardObject(this.refRight, objects.ellipse)
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
    addWhiteBoardObject(this.refRight, object)
  }

  handleOnObjectsModified(object) {
    modifyWhiteBoardObjects(this.refRight, object, true)
  }

  handleOnObjectsRemoved(objects) {
    removeWhiteBoardObjects(this.refRight, objects)
  }

  handleOnSelectionCreated(selection) {
    createWhiteBoardSelection(this.refRight, selection)
  }

  handleOnSelectionUpdated(selection) {
    updateWhiteBoardSelection(this.refRight, selection)
  }

  handleOnSelectionCleared(selection) {
    clearWhiteBoardSelection(this.refRight, selection)
  }
}
