import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { Canvas, extend, useFrame } from 'react-three-fiber'
import ThreeMeshUI from 'three-mesh-ui'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Button from './button'
import './styles.css'

extend(ThreeMeshUI)

function Title({ accentColor }) {
  return (
    <block
      args={[{
        width: 1,
        height: 0.25,
        backgroundOpacity: 0,
        justifyContent: 'center'
      }]}>
      <text content={"Hello "} />
      <text content={"world!"} args={[{ fontColor: accentColor }]} />
    </block>
  )
}

function Panel() {
  const [accentColor] = useState(() => new THREE.Color('red'))
  useFrame(() => {
    ThreeMeshUI.update()
  })
  return (
    <block
      args={[{
        width: 1,
        height: 0.5,
        fontSize: 0.1,
        backgroundOpacity: 1,
        fontFamily: "./Roboto-msdf.json",
        fontTexture: "./Roboto-msdf.png"
      }]}>
      <Title accentColor={accentColor} />
      <Button onClick={() => accentColor.offsetHSL(1 / 3, 0, 0)} />
    </block>
  )
}
const buttonIndex = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0.4] }}>
      <color args={["#eee"]} attach="background" />
      <OrbitControls />
      <Panel />
    </Canvas>
  )
}
export default buttonIndex