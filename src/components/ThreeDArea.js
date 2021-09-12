import React, {Component} from 'react'
import * as THREE from 'three'
import {saveAs} from 'file-saver'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
import STLViewer from 'stl-viewer'
export default class ThreeDArea extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      namevalue: '',
      stlViewerModel: './3dmodels/zaxe_keychain.stl'
    }
  }

  handleChange(event) {
    this.setState({namevalue: event.target.value})
  }

  handleSubmit(event) {
    const scene = new THREE.Scene()
    const stlExporter = new STLExporter()
    const fontLoader = new THREE.FontLoader()
    const keychainObjectLoader = new OBJLoader()
    const camera = new THREE.PerspectiveCamera()
    const renderer = new THREE.WebGLRenderer({antialias: true})
    let blob
    let textObject
    let textObjectBox
    let textObjectLength

    fontLoader.load('./fonts/Montserrat_Bold.json', (font) => {
      const geometry = new THREE.TextGeometry(this.state.namevalue, {
        font: font,
        size: 10,
        height: 3,
        color: '#009ade'
      })

      textObject = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: '#009ade'})
      ])

      scene.add(textObject)

      textObjectBox = new THREE.Box3().setFromObject(textObject)
      textObjectLength = parseInt(textObjectBox.max.x - textObjectBox.min.x)
      textObject.position.set(-textObjectLength + 20, 13, 0)
      textObject.rotation.set(0, 0, 0)

      loadKeychainObject()
    })

    const loadKeychainObject = () => {
      keychainObjectLoader.load('./3dmodels/keychain.obj', (keychainObject) => {
        scene.add(keychainObject)
        keychainObject.position.set(0, 17, 0)
        if (textObjectLength > 100) {
          keychainObject.scale.setX(textObjectLength / 50)
          textObject.position.set(-textObjectLength + 30, 13, 0)
        } else if (textObjectLength > 50) {
          keychainObject.scale.setX(textObjectLength / 50)
          textObject.position.set(-textObjectLength + 19, 13, 0)
        } else {
          textObject.position.set(-textObjectLength + 10, 13, 0)
        }

        renderer.render(scene, camera)
        blob = new Blob([stlExporter.parse(scene)])
        saveAs(blob, `${this.state.namevalue}_keychain.stl`)
      })
    }
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="threeD_Area pt-3">
          <form onSubmit={this.handleSubmit}>
            <div className="col-12">
              <input
                type="text"
                className="name-input"
                namevalue={this.state.namevalue}
                onChange={this.handleChange}
                id="name"
                placeholder="Ad / Kan Grubu"
                required
                autoComplete="off"
              />
            </div>
            <div className="col-12 text-center p-3">
              <button type="submit" className="submit-btn">
                Gönder
              </button>
            </div>

            <div
              className="col-12 p-0 m-0"
              data-aos="zoom-in-up"
              data-aos-delay="500"
            >
              <STLViewer
                className="model-viewer mx-auto mt-3"
                width={300}
                height={200}
                modelColor="#009ADE"
                backgroundColor="#FFF"
                model={this.state.stlViewerModel}
                rotate={false}
                cameraX={-200}
                cameraY={-100}
              ></STLViewer>
              <div className="cursor-group mx-auto text-center">
                <div className="cursor-outer text-center col-12">
                  <i className="fas fa-hand-pointer text-center cursor-icon"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
