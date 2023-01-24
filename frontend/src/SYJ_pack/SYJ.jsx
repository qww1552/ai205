import MissionProgress from './missionProgress'
import MissionList from './missionList'
import ImageButton from './imageButton'
const SYJ = () => {


  return (
    <>
      <div className="missionComponent floatingComponent">
        <MissionProgress/>
        <MissionList/>
      </div>
      <ImageButton/>
    </>
  )
}

export default SYJ;