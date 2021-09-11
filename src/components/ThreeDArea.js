import React, {Component} from 'react'
import * as THREE from 'three'
import {saveAs} from 'file-saver'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
import STLViewer from 'stl-viewer'
const objLoader = new OBJLoader()
var stl
export default class oldtda extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {value: ''}
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    let name = this.state.value
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      5,
      100
    )

    var textlength = 0
    var textMesh
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({antialias: true})

    const loader = new THREE.FontLoader()

    loader.load('./fonts/Montserrat_Bold.json', (font) => {
      const geometry = new THREE.TextGeometry(name, {
        font: font,
        size: 10,
        height: 3,
        color: '#009ade'
      })

      textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: '#009ade'})
      ])

      scene.add(textMesh)
      var box = new THREE.Box3().setFromObject(textMesh)
      textlength = parseInt(box.max.x - box.min.x)
      textMesh.position.set(-textlength + 20, 13, 0)
      textMesh.rotation.set(0, 0, 0)

      loadObj()
    })

    function loadObj() {
      objLoader.load('./3dmodels/keychain.obj', (obj) => {
        scene.add(obj)
        obj.position.set(0, 17, 0)
        if (textlength > 100) {
          obj.scale.setX(textlength / 50)
          textMesh.position.set(-textlength + 30, 13, 0)
        } else if (textlength > 50) {
          obj.scale.setX(textlength / 50)
          textMesh.position.set(-textlength + 19, 13, 0)
        } else {
          textMesh.position.set(-textlength + 10, 13, 0)
        }
        scene.position.setX(100)
        renderer.render(scene, camera)

        let exporter = new STLExporter()
        stl = exporter.parse(scene)

        const blob = new Blob([stl])

        saveAs(blob, `${name}_keychain.stl`)
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
                value={this.state.value}
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

            <STLViewer
              className="model-viewer mx-auto mt-3"
              width={300}
              height={200}
              modelColor="#009ADE"
              backgroundColor="#FFF"
              model="./3dmodels/zaxe_keychain.stl"
              rotate={false}
              cameraX={-200}
              cameraY={-100}
            ></STLViewer>
            <div className="cursor-group mx-auto text-center">
              <div className="cursor-outer text-center col-12">
                <i class="fas fa-hand-pointer text-center cursor-icon"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
