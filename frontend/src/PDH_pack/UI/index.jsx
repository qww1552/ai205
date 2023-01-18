import { useState } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Button from './Button'
import './styles.css'
import Title from './Title'

import ThreeMeshUI, { Block } from 'three-mesh-ui'



function Panel() {
    const scene = useThree((state) => state.scene);

    const text = new ThreeMeshUI.Text({
        content: "Some text to be displayed"
    });


    const container = new ThreeMeshUI.Block({
        width: 1.2,
        height: 0.7,
        padding: 0.2,
        fontFamily: './Roboto-msdf.json',
        fontTexture: './Roboto-msdf.png',
       });
    container.add(text);
    
    


    // const [accentColor] = useState(() => new THREE.Color('red'))
    useFrame((state) => {

        scene.add(container); 

        ThreeMeshUI.update()
    })

    return (
        <>
            {/* <block
                args={{
                    width: 1,
                    height: 0.5,
                    fontSize: 0.1,
                    backgroundOpacity: 1,
                    fontFamily: './Roboto-msdf.json',
                    fontTexture: './Roboto-msdf.png'
                }}></block> */}
            {/* <block
                args={{
                    width: 1,
                    height: 0.5,
                    fontSize: 0.1,
                    backgroundOpacity: 1,
                    fontFamily: './Roboto-msdf.json',
                    fontTexture: './Roboto-msdf.png'
                }}>
                <Title accentColor={accentColor} />/
                <Button onClick={() => accentColor.offsetHSL(1 / 3, 0, 0)} />
            </block> */}
        </>

    )
}

export default Panel;
