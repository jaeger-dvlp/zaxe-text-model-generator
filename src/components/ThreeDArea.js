import React, {PureComponent} from 'react'
import * as THREE from 'three'
import {saveAs} from 'file-saver'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
const objLoader = new OBJLoader()
export default class ThreeDArea extends PureComponent {
  render() {
    {
      let name = 'Ege'
      const renderer = new THREE.WebGLRenderer()
      const camera = new THREE.PerspectiveCamera()
      const scene = new THREE.Scene()
      objLoader.load('./3dmodels/keychain.obj', (obj) => {
        //obj.position.set(0, 0, 0)

        scene.add(obj)
        obj.position.set(0, 30, 0)
        obj.scale.set(parseInt(name.length / 8) + 1, 1)
        obj.rotation.set(0, 0, 0)
        //object = obj
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
          new THREE.MeshPhongMaterial({color: '#009ade'})
        ])

        scene.add(textMesh)
        textMesh.position.set(-(name.length * 7) - 10, 12, 0)
        textMesh.rotation.set(0, 0, 0)
        renderer.render(scene, camera)
        let exporter = new STLExporter()
        let stl = exporter.parse(scene)
        //const buffer = exportSTL.fromMesh(textMesh)
        const blob = new Blob([stl])
        saveAs(blob, 'test.stl')
      })
    }
    return <div className="threeD_Area"></div>
  }
}
