import React, {PureComponent} from 'react'
import * as THREE from 'three'
import {saveAs} from 'file-saver'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'

const objLoader = new OBJLoader()
const STLViewer = require('stl-viewer')

export default class ThreeDArea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      model: undefined
    }
  }
  render() {
    {
      var stl
      let name = 'Ege'
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        5,
        100
      )
      camera.position.x = -10
      camera.position.y = -10
      camera.position.z = 95
      camera.rotation.x = 0.5
      camera.rotation.y = -0.2

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xdddddd)

      const renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.shadowMap.enabled = true
      document.body.appendChild(renderer.domElement)
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
      objLoader.load('./3dmodels/keychain.obj', (obj) => {
        scene.add(obj)
        obj.position.set(0, 30, 0)
        obj.scale.set(parseInt(name.length / 8) + 1, 1)
        obj.rotation.set(0, 0, 0)
      })

      const loader = new THREE.FontLoader()

      loader.load('./fonts/Montserrat_Regular.json', (font) => {
        const geometry = new THREE.TextGeometry(name, {
          font: font,
          size: 10,
          height: 1,
          color: '#009ade'
        })

        const textMesh = new THREE.Mesh(geometry, [
          new THREE.MeshBasicMaterial({color: '#009ade'})
        ])

        const text = new THREE.Mesh(geometry, material)

        scene.add(text)

        text.position.set(-(name.length * 7) - 10, 12, 0)
        text.rotation.set(0, 0, 0)

        scene.setClearColor = '#fff'

        renderer.setSize(400, 400)
        const animate = function animate() {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
        }

        animate()
        let exporter = new STLExporter()
        stl = exporter.parse(scene)
        this.setState({model: stl})

        const blob = new Blob([stl])

        //saveAs(blob, 'test.stl')
      })
    }
    return <div className="threeD_Area"></div>
  }
}
