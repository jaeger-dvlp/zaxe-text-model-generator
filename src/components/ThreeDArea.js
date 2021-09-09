import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import {saveAs} from 'file-saver'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
import {render} from '@testing-library/react'
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
    //alert('A name was submitted: ' + this.state.value)

    let name = this.state.value
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      5,
      100
    )
    camera.position.x = 10
    camera.position.y = -30
    camera.position.z = 100

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({antialias: true})
    objLoader.load('./3dmodels/keychain.obj', (obj) => {
      scene.add(obj)
      obj.position.set(0, 30, 0)
      obj.scale.set(parseInt(name.length / 8) + 1, 1)
      obj.rotation.set(0, 0, 0)
      obj.traverse(function (obj) {
        if (obj.isMesh) {
          obj.material.color.set('#009ade')
        }
      })
    })

    const loader = new THREE.FontLoader()

    loader.load('./fonts/Montserrat_Regular.json', (font) => {
      const geometry = new THREE.TextGeometry(name, {
        font: font,
        size: 10,
        height: 5,
        color: '#009ade'
      })

      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: '#009ade'})
      ])

      scene.add(textMesh)

      textMesh.position.set(-(name.length * 7) - 10, 12, 0)
      textMesh.rotation.set(0, 0, 0)

      renderer.render(scene, camera)

      let exporter = new STLExporter()
      stl = exporter.parse(scene)

      const blob = new Blob([stl])

      saveAs(blob, 'zaxe_baski.stl')
    })

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
                placeholder="Adınız"
                required
                autoComplete="off"
              />
            </div>
            <div className="col-12 text-center p-3">
              <button type="submit" className="submit-btn">
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
