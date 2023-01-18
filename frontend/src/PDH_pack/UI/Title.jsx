import { extend } from '@react-three/fiber'
import ThreeMeshUI from 'three-mesh-ui'

extend({ ThreeMeshUI })

function Title({ accentColor }) {
    return (
      <block
        args={{
          width: 1,
          height: 0.25,
          backgroundOpacity: 0,
          justifyContent: 'center'
        }}>
        <text content={'Hello '} />
        <text content={'world!'} args={{ fontColor: accentColor }} />
      </block>
    )
  }

export default Title;