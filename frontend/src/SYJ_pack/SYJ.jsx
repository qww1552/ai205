import MissionProgress from './missionProgress'
import MissionList from './missionList'
import ImageButton from './imageButton'
const SYJ = () => {


  return (
    <>
      <div style={{position: "absolute", left:"10px", top: "10px", width:"300px"}}>
        <MissionProgress/>
        <MissionList/>
      </div>
      <ImageButton/>
    </>
  )
}

export default SYJ;