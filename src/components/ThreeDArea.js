import React, {PureComponent} from 'react'
import * as THREE from 'three'

export default class ThreeDArea extends PureComponent {
  render() {
    const exporter = new THREE.STLExporter()

    exporter()

    const loader = new THREE.FontLoader()
    loader.load('./fonts/Montserrat_Regular.json', (font) => {
      const geometry = new THREE.TextGeometry('zaxe', {
        font: font,
        size: 2,
        height: 1,
        color: 'red'
      })

      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: '#009ade'}),
        new THREE.MeshPhongMaterial({color: '#009ade'})
      ])
      console.log(textMesh)
    })
    return <div className="threeD_Area"></div>
  }
}
